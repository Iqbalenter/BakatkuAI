import BackButton from "../components/Elements/BackButton";
import FormRegister from "../components/Fragments/RegisterContent/FormRegister";
import GoogleLogin from "../components/Fragments/RegisterContent/GoogleLogin";
import Footer from "../components/Layouts/Footer";

import '../css/register.css'
const Register = () => {
    return (
        <div className="register-container">
            <BackButton to="/login"/>
            <FormRegister/>
            <GoogleLogin/>
            <Footer/>
        </div>
    )
}

export default Register;