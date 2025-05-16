import BackButton from '../components/Elements/BackButton';
import Content from '../components/Fragments/DashboardProgressContent/Content';
import Footer from '../components/Layouts/Footer';
import Navbar from '../components/Layouts/Navbar';
import '../css/dashboard-progress.css';

const DashboardProgress = () => {
    return (
        <div className='dashboard-progress-container'>
            <BackButton to="/dashboard" titleStyle={{ color: "#ffff", margin: "10px 80px", fontWeight: "700" }}>Dashboard</BackButton>
            <Content/>
            <Navbar/>
            <Footer/>
        </div>
    )
}

export default DashboardProgress;