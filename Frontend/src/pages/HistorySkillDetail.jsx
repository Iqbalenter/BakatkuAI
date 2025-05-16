import { useEffect, useState } from 'react';
import '../css/history-skill-detail.css';
import { useNavigate } from 'react-router';

import SkillsChart from '../components/Fragments/HistorySkillDetailContent/SkillsChart';
import SkillList from '../components/Fragments/HistorySkillDetailContent/SkillList';
import SkillDescription from '../components/Fragments/HistorySkillDetailContent/SkillDescription';
import Navbar from '../components/Layouts/Navbar';
import Footer from '../components/Layouts/Footer';
import BackButton from '../components/Elements/BackButton';

const HistorySkillDetail = () => {
    const [skillDetail, setSkillDetail] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem("historySkillDetail");
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        if (data) {
            setSkillDetail(JSON.parse(data));
        }
    }, []);

    if (!skillDetail) {
        return <p>Loading data...</p>;
    }

    return (
        <div>
            <BackButton to="/history-skill" titleStyle={{ margin: "10px 90px", fontWeight: "700" }}>
                {skillDetail.skill_choice}
            </BackButton>
            <SkillsChart skills={skillDetail.skills} />
            <SkillList skills={skillDetail.skills} />
            <SkillDescription name={skillDetail.skill_choice} description={skillDetail.description} />
            <Navbar />
            <Footer />
        </div>
    );
};

export default HistorySkillDetail;
