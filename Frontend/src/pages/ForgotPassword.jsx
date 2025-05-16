import BackButton from "../components/Elements/BackButton";
import Content from "../components/Fragments/ForgotPasswordContent/Content";
import Footer from "../components/Layouts/Footer";
import Navbar from "../components/Layouts/Navbar";
import '../css/forgot-password.css';
const ForgotPassword = () => {
    return (
        <div>
            <BackButton to="/profile" titleStyle={{ margin: "10px 75px", fontWeight: "700" }}>Lupa Password</BackButton>
            <Content/>
            <Footer/>
        </div>
    )
}

export default ForgotPassword;