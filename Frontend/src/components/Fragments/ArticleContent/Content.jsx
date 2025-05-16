import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'swiper/modules';

const Content = () => {

    const [courses, setCourses] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isProgressLoading, setIsProgressLoading] = useState(false);
    const navigate = useNavigate();

    const tokens = localStorage.getItem("token");
    if (!tokens) {
        navigate('/login');
    }
    const handleSeeFullProgress = async () => {
        setIsProgressLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/progress/get`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const progressData = response.data.data;
            localStorage.setItem("progressData", JSON.stringify(progressData));
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("Progress not found, still directed.");
                localStorage.setItem("progressData", JSON.stringify({}));
            } else {
                console.error("Failed to retrieve progress data:", error);
                alert("Failed to retrieve progress data.");
                setIsProgressLoading(false);
                return;
            }
        }

        setIsProgressLoading(false);
        navigate('/dashboard-progress');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                const courseResponse = await fetch(`${import.meta.env.VITE_API_URL}/skill-development`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const courseData = await courseResponse.json();
                if (courseResponse.ok) {
                    setCourses(courseData?.data?.courses || []);
                }

                const projectResponse = await fetch(`${import.meta.env.VITE_API_URL}/recomend-project`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const projectData = await projectResponse.json();
                if (projectResponse.ok) {
                    setProjects(projectData.data || []);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="article-content-container">
            <div className="article-title">
                <h1>Skill Development</h1>
            </div>

            <div className="slider-container">
                {courses.length === 0 ? (
                    <p>Course data is not available.</p>
                ) : (
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                        }}
                    >
                        {courses.map((course, index) => (
                            <SwiperSlide key={index}>
                                <a href={course.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                    <div className="card">
                                        <img src={course.PhotoUrl} alt={course.name} className="card-image" />
                                        <div className="card-content">
                                            <h3>{course.name}</h3>
                                            <p>{course.description}</p>
                                        </div>
                                    </div>
                                </a>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>

            <div className="recomend-project">
                <h3>Project Suggestions</h3>
                <div className="list-project">
                    {projects.length === 0 ? (
                        <p>Project data is not available.</p>
                    ) : (
                        projects.map((project, index) => (
                            <div key={index} className="project">
                                <p>{project}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="profile-button">
                <button className="profile-edit-button" onClick={handleSeeFullProgress} disabled={isProgressLoading}>
                    {isProgressLoading ? 'Loading...' : 'Check Progress Tracker'}
                </button>
            </div>
        </div>
    );
};

export default Content;
