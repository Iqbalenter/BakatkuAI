import { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../utils/getCroppedImg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import MailLogo from "../../../assets/ic_baseline-email.png";
import PasswordLogo from "../../../assets/mdi_password.png";
import VerticalIcon from "../../../assets/vertical-line.png";
import ShowIcon from "../../../assets/show.png";
import HiddenIcon from "../../../assets/hidden.png";
import PersonIcon from "../../../assets/wpf_name.png";
import EditIcon from "../../../assets/EditPen.png";
import Profile from "../../../assets/defaultprofile.png";

import Image from "../../Elements/Image/Index";
import { NavLink } from "react-router";

const ProfileContent = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [profileImage, setProfileImage] = useState(Profile);
  const [croppedImageTemp, setCroppedImageTemp] = useState(null);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.status === "success") {
          const { name, email, photoUrl } = response.data.data;
          setUserData({ name, email });
          if (photoUrl) setProfileImage(photoUrl);
        }
      } catch (error) {
        console.error("Failed to retrieve profile data:", error);
        if (error.response && error.response.status === 401) navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImageSrc(reader.result);
  };

  const showCroppedImage = async () => {
    try {
      const { fileUrl } = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImageTemp(fileUrl);
      setImageSrc(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const formData = new FormData();
      formData.append("name", userData.name);

      if (croppedImageTemp) {
        const response = await fetch(croppedImageTemp);
        const blob = await response.blob();
        const file = new File([blob], "profile.jpg", { type: blob.type });
        formData.append("photo", file);
      }

      const response = await axios.put(`${import.meta.env.VITE_API_URL}/profile/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === "success") {
        const updatedPhotoUrl = response.data.data.photoUrl;
        if (updatedPhotoUrl) {
          setProfileImage(updatedPhotoUrl);
          setCroppedImageTemp(null);
        }
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile: " + response.data.data.message);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("An error occurred while saving the profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ height: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="profile-content">
      {/* Profile Image */}
      <div className="profile-image" style={{ position: 'relative', width: 90, margin: '0 auto' }}>
        <label htmlFor="profile-upload" style={{ cursor: isEditing ? 'pointer' : 'default', display: 'block' }}>
          <img
            src={croppedImageTemp || profileImage}
            width={90}
            alt="Profile"
            style={{ borderRadius: '50%', display: 'block' }}
          />
          {isEditing && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              Click to change
            </div>
          )}
        </label>
        {isEditing && (
          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        )}
      </div>

      {/* Cropper */}
      {imageSrc && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.7)", zIndex: 9999,
          display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"
        }}>
          <div style={{ position: 'relative', width: 300, height: 300, backgroundColor: '#fff', borderRadius: '8px' }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            style={{ marginTop: "10px", width: "300px" }}
          />
          <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
            <button onClick={showCroppedImage} style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px" }}>
              Save Photo
            </button>
            <button onClick={() => setImageSrc(null)} style={{ padding: "10px 20px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "5px" }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="profile-data">
        <div className="profile-form">
          <form>
            <div className="form-container">
              <div className="input-box">
                <span className="icon"><Image src={PersonIcon} /></span>
                <span className="icon-v"><Image src={VerticalIcon} /></span>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>

              <div className="input-box">
                <span className="icon"><Image width={17} src={MailLogo} /></span>
                <span className="icon-v"><Image src={VerticalIcon} /></span>
                <input
                  disabled
                  type="email"
                  name="email"
                  value={userData.email}
                  readOnly
                />
              </div>

              <NavLink to="/forgot-password">Change Password?</NavLink>
            </div>
          </form>

          <div className="profile-button">
            <button onClick={isEditing ? handleSave : () => setIsEditing(true)} className="profile-edit-button" disabled={saving}>
              <img src={EditIcon} width={15} style={{ marginRight: "5px" }} />
              {saving ? "Saving..." : isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
