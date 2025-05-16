import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SkillProgress = () => {
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const skillsFromBackend = location.state?.skills || {};
    const skillEntries = Object.entries(skillsFromBackend);
    const skillsName = Object.keys(skillsFromBackend);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        if (!location.state || !skillsFromBackend || Object.keys(skillsFromBackend).length === 0) {
            navigate("/send-cv");
            return;
        }

        setLoading(false);
    }, [navigate, location.state, skillsFromBackend]);

    const handleSkillClick = async (skillName) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/get-skill-detail`,
                { skill_choice: skillName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            navigate("/result-analysis2", { state: response.data.data });
        } catch (error) {
            console.error("Error getting skill detail:", error.response?.data || error.message);
            alert("Gagal mengambil detail skill.");  
        } finally {
            setLoading(false);
        }
    };

    // Jangan render jika data belum siap
    if (!location.state || !skillsFromBackend || Object.keys(skillsFromBackend).length === 0) {
        return null; // atau bisa juga tampilkan loader jika perlu
    }    

    if (loading) {
        return (
            <div className="full-screen-loading">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="skill-progress">
            <div className="skill-container">
                <h3>Skill Level List</h3>
                {skillEntries.map(([name, level], index) => (
                    <div key={index} className="skill-bar">
                        <span className="skill-name">{name}</span>
                        <div className="progress">
                            <div
                                className="progress-fill"
                                style={{
                                    width: `${level}%`,
                                    background: "linear-gradient(90deg, #1e3c72, #2a5298)",
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="selection-container">
                <h3>Choose the skills you want</h3>
                {skillsName.map((skill, index) => (
                    <button
                        key={index}
                        className={`skill-button ${index % 2 === 0 ? "white" : "blue"}`}
                        onClick={() => handleSkillClick(skill)}
                    >
                        {skill}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SkillProgress;
