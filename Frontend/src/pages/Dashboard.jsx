import BackButton from '../components/Elements/BackButton';
import Content from '../components/Fragments/DashboardContent/Content';
import Footer from '../components/Layouts/Footer';
import Navbar from '../components/Layouts/Navbar';

import '../css/dashboard.css';

const Dashboard = () => {
    return (
        <div className='dashboard-container'>
            <BackButton to="/" titleStyle={{ color: "#ffff", margin: "10px 80px", fontWeight: "700" }}>Dashboard</BackButton>
            <Content/>
            <Navbar/>
            <Footer/>
        </div>
    )
}

export default Dashboard;