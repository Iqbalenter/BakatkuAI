import BackButton from "../components/Elements/BackButton";
import Main from "../components/Fragments/VerificationEmailContent/Main";
import Footer from "../components/Layouts/Footer";

import '../css/verification.css';
const VerificationEmail = () => {
    return (
        <div className="verification-container">
            <BackButton to="/login" />
            <Main/>
            <Footer/>
        </div>
    )
}

export default VerificationEmail;