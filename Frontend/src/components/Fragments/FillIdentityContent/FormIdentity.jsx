import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const FormIdentity = () => {
  const navigate = useNavigate();
  const [work, setWork] = useState("");
  const [activity, setActivity] = useState("");
  const [hobby, setHobby] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [options, setOptions] = useState([]);

  // Check if user has already filled out identity, if so redirect
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
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data?.data;
        const isComplete =
          data?.work &&
          data?.activity &&
          data?.hobby &&
          data?.experience &&
          data?.skill?.length > 0;

        if (isComplete) {
          navigate("/"); // Redirect to home if identity is already filled
        }
      } catch (err) {
        // If fetching identity fails, user may not have filled it yet → proceed
      }
    };

    checkIdentity();
  }, [navigate]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/skill`);
        const skillsFromBackend = res.data?.data || [];
        setOptions(skillsFromBackend);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };

    fetchSkills();
  }, []);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue && !selectedItems.includes(selectedValue)) {
      setSelectedItems([...selectedItems, selectedValue]);
    }
  };

  const handleRemove = (item) => {
    setSelectedItems(selectedItems.filter((selected) => selected !== item));
  };

  const handleSubmit = async () => {
    if (!work || !activity || !hobby || !experience || selectedItems.length === 0) {
      alert("Please complete all fields before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/identity`,
        {
          work,
          activity,
          hobby,
          experience,
          skill: selectedItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/"); // Redirect to home on success
    } catch (error) {
      console.error("Failed to submit identity:", error);
      alert("An error occurred while submitting data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-identity">
      <div className="mb-3">
        <label className="form-label">Current Job</label>
        <input
          type="text"
          className="form-control"
          value={work}
          onChange={(e) => setWork(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Your Daily Activities</label>
        <input
          type="text"
          className="form-control"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Your Hobbies</label>
        <input
          type="text"
          className="form-control"
          value={hobby}
          onChange={(e) => setHobby(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Years of Work Experience</label>
        <input
          type="number"
          className="form-control"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Select Your Skills</label>
        <Select
          options={options.map((opt) => ({ value: opt, label: opt }))}
          onChange={(selectedOption) => {
            if (
              selectedOption &&
              !selectedItems.includes(selectedOption.value)
            ) {
              setSelectedItems([...selectedItems, selectedOption.value]);
            }
          }}
          placeholder="Search skills..."
          className="basic-single"
          classNamePrefix="select"
          isSearchable
        />
      </div>

      <div className="mt-4 p-4 border rounded bg-white shadow-sm">
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full border border-blue-300 max-w-xs"
            >
              <span className="truncate max-w-[140px]">{item}</span>
              <button
                onClick={() => handleRemove(item)}
                className="ml-2 text-blue-500 hover:text-blue-700 hover:bg-blue-200 rounded-full p-1 transition flex items-center justify-center"
                aria-label={`Remove ${item}`}
                style={{ width: '20px', height: '20px' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 8.586l4.95-4.95a1 1 0 011.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10 3.636 5.05A1 1 0 015.05 3.636L10 8.586z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="login-button-container mt-4">
        <button
          className="login-button btn btn-primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Next"}
        </button>
      </div>
    </div>
  );
};

export default FormIdentity;
