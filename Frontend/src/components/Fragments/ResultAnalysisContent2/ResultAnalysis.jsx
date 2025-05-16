import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Result = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const { skill_choice, level, description } = location.state || {};

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        if (!skill_choice || level === undefined || !description) {
            navigate("/send-cv");
            return;
        }

        setLoading(false);
    }, [navigate, skill_choice, level, description]);

    const getLevelText = (level) => {
        if (level >= 80) return "5 Very Suitable";
        if (level >= 60) return "4 Suitable";
        if (level >= 40) return "3 Simply";
        if (level >= 20) return "2 Less Suitable";
        return "1 Not suitable";
    };

    if (!skill_choice || level === undefined || !description) {
        return null;
    }

    if (loading) {
        return (
            <div className="full-screen-loading">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="result">
            <div className="result-choice">
                <h3>{skill_choice}</h3>
                <div className="choice">
                    <p>{skill_choice}</p>
                </div>
                <p>Level: {getLevelText(level)}</p>
            </div>

            <div className="description">
                <h3>Brief Description</h3>
                <p>{description}</p>
            </div>

            <div className="login-button-container">
                <button className="login-button" onClick={() => navigate("/dashboard")}>Further Development</button>
            </div>
        </div>
    );
};

export default Result;
