import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HistoryIcon from '../../../assets/history-time.png';

const Content = () => {
    const [completed, setCompleted] = useState([""]);
    const [progressList, setProgressList] = useState([]);
    const [progressError, setProgressError] = useState("");
    const [skillData, setSkillData] = useState({ skill: '', description: '' });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleSeeFullProgress = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/progress/get`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const progressData = response.data.data;
            localStorage.setItem("progressData", JSON.stringify(progressData));
            navigate('/dashboard-progress');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("Progress not found, still directed.");
                localStorage.setItem("progressData", JSON.stringify({}));
                navigate('/dashboard-progress');
            } else {
                console.error("Failed to retrieve progress data:", error);
                alert("Failed to retrieve progress data.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleHistoryClick = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/history`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const skillHistory = response.data.data.skills;
            localStorage.setItem("historySkills", JSON.stringify(skillHistory));
            navigate("/history-skill");
        } catch (error) {
            console.error("Failed to retrieve history data:", error);
            alert("Failed to retrieve skill history data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;

                }
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const { skill, description } = response.data.data;
                setSkillData({ skill, description });
            } catch (error) {
                console.error("Failed to retrieve dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    useEffect(() => {
        const fetchProgressData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/progress/get`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const progressData = response.data.data;
                const titles = Object.keys(progressData);
                setProgressList(titles);
                const completedItems = titles.filter((title) => progressData[title] === true);
                setCompleted(completedItems);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setProgressError("No Progress");
                    setProgressList([]);
                    setCompleted([]);
                } else {
                    console.error("Failed to take progress:", error);
                    setProgressError("Failed to retrieve progress data");
                }
            }
        };

        fetchProgressData();
    }, []);

    const handleItemClick = (item) => {
        const updatedCompleted = completed.includes(item)
            ? completed.filter((c) => c !== item)
            : [...completed, item];

        setCompleted(updatedCompleted);
        updateProgressOnServer(updatedCompleted);
    };

    const updateProgressOnServer = async (updatedCompleted) => {
        try {
            const token = localStorage.getItem("token");

            const updatedProgress = progressList.map((title) => ({
                title,
                status: updatedCompleted.includes(title),
            }));

            await axios.post(`${import.meta.env.VITE_API_URL}/progress`, {
                progress: updatedProgress,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error("Failed to save progress:", error);
        }
    };

    if (loading) {
        return (
            <div className="full-screen-loading">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="dashboard-choice">
                <h1>{skillData.skill?.trim() ? skillData.skill : 'Skill'}</h1>
                <div className="dashboard-choice-content">
                    <h2>Brief description</h2>
                    <p>{skillData.description?.trim() ? skillData.description : 'Data not available'}</p>
                </div>
            </div>

            <div className="dashboard-progress-track">
                <h1>Progress Tracker</h1>
                <div className="dashboard-progress-track-lists">
                    <div className="list">
                        {progressError ? (
                            <p>{progressError}</p>
                        ) : progressList.length === 0 ? (
                            <p>Loading progress...</p>
                        ) : (
                            progressList.map((item) => (
                                <p
                                    key={item}
                                    onClick={() => handleItemClick(item)}
                                    className={completed.includes(item) ? "completed" : ""}
                                >
                                    {item} {completed.includes(item) && "✔"}
                                </p>
                            ))
                        )}
                    </div>
                    <div className="dashboard-progress-track-button">
                        <button className='btn' onClick={handleSeeFullProgress}>See Full Progress</button>
                    </div>
                </div>
            </div>

            <div className="dashboard-history">
                <button className='btn' onClick={handleHistoryClick}>
                    <img src={HistoryIcon} width={25} /> History
                </button>
            </div>
        </div>
    );
};

export default Content;
