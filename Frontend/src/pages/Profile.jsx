import BackButton from '../components/Elements/BackButton';
import ProfileContent from '../components/Fragments/ProfileContent';
import Footer from '../components/Layouts/Footer';
import Navbar from '../components/Layouts/Navbar';
import '../css/profile.css';


const Profile = () => {
    return (
        <div>
            <BackButton to="/" titleStyle={{ margin: "10px 95px", fontWeight: "700" }}>Profile</BackButton>
            <ProfileContent/>
            <Navbar/>
            <Footer/>
        </div>
    )
}

export default Profile;