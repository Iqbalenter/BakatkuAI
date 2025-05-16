import BackButton from "../components/Elements/BackButton";
import SendCv from "../components/Fragments/UploadCvContent/SendCv";
import Footer from "../components/Layouts/Footer";
import Navbar from "../components/Layouts/Navbar";

import '../css/upload-cv.css'

const UploadCv = () => {
    return (
        <div>
            <BackButton to="/" titleStyle={{ margin: "10px 85px", fontWeight: "700" }}>Upload CV</BackButton>
            <SendCv/>
            <Navbar/>
            <Footer/>        
        </div>
    )
}

export default UploadCv;