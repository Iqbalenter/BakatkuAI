import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Content = () => {
    const [loading, setLoading] = useState(true);
    const [skills, setSkills] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        const storedHistory = localStorage.getItem("historySkills");
        if (storedHistory) {
            setSkills(JSON.parse(storedHistory));
        }
        setLoading(false);
    }, []);

    const handleSkillClick = async (skill) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/history/detail`,
                { skill_choice: skill },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const detailData = response.data.data;
            localStorage.setItem("historySkillDetail", JSON.stringify(detailData));

            navigate("/history-skill-detail");

        } catch (error) {
            setLoading(false);
            console.error("Failed to pick up skill details:", error);
            alert("Failed to pick up skill details.");
        }
    };


    return (
        <div className="history-content-container">
            {loading && (
                <div className="full-screen-loading">
                    <div className="spinner"></div>
                </div>
            )}
            {skills.length === 0 ? (
                <p>No skill history was found.</p>
            ) : (
                skills.map((skill, index) => (
                    <div key={index} className="history-content-button">
                        <button onClick={() => handleSkillClick(skill)}>{skill}</button>
                    </div>
                ))
            )}
        </div>
    )
}

export default Content;