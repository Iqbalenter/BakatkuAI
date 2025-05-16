import '../css/history-skill.css';

import Content from '../components/Fragments/HistoryContent/Content';
import Navbar from '../components/Layouts/Navbar';
import Footer from '../components/Layouts/Footer';
import BackButton from '../components/Elements/BackButton';

const HistorySkill = () => {
    return (
        <div>
            <BackButton to="/dashboard" titleStyle={{ margin: "10px 40px", fontWeight: "700" }}>History Your skill choice</BackButton>
            <Content/>
            <Navbar/>
            <Footer/>
        </div>
    )
}

export default HistorySkill;