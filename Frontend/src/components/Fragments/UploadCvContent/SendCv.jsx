import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PdfIcon from '../../../assets/pepicons-print_cv.png';

const SendCv = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkIdentity = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/identity/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = res.data?.data;
                const isComplete =
                    data?.work &&
                    data?.activity &&
                    data?.hobby &&
                    data?.experience &&
                    data?.skill?.length > 0;

                if (!isComplete) {
                    alert("Please complete the identity data first.");
                    navigate("/fill-identity");
                } else {
                    setLoading(false);
                }
            } catch (error) {
                alert("Please complete the identity data first.");
                navigate("/fill-identity");
            } finally {
                setLoading(false);
            }
        };

        checkIdentity();
    }, [navigate]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };

    const handleSubmit = async () => {
        if (!file) return alert("Please select a file first.");

        const formData = new FormData();
        formData.append("file", file);

        setIsSubmitting(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/send-cv`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            navigate("/result-analysis", { state: { skills: response.data.data.skills } });

        } catch (error) {
            console.error("Upload error:", error.response?.data || error.message);
            alert("Failed to upload CV or analyze skills.");
        } finally {
            setIsSubmitting(false);
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
        <div>
            {(loading || isSubmitting) && (
                <div className="full-screen-loading">
                    <div className="spinner"></div>
                </div>
            )}

            {!loading && !isSubmitting && (
            <div className="upload-container mt-5">
                <label htmlFor="file-input" className="file-drop-area">
                    <img src={PdfIcon} width={70} className="file-icon" />
                    {fileName ? (
                        <p className="file-name">{fileName}</p>
                    ) : (
                        <>
                            <p className="upload-text">Send CV file</p>
                            <p className="format-text">Format via PDF</p>
                        </>
                    )}
                </label>
                <input id="file-input" type="file" accept=".pdf" onChange={handleFileChange} />
                <button className="submit-btn mt-5" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                        <div className="spinner-button" />
                    ) : (
                        "Submit"
                    )}
                </button>
            </div>
            )}
        </div>
    );
};

export default SendCv;
