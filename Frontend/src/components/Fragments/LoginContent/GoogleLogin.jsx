import { useEffect } from "react";
import { auth, provider } from "../../../config/firebase"; // sesuaikan path
import { signInWithPopup, getIdToken } from "firebase/auth";
import GoogleLogo from "../../../assets/devicon_google.png";
import MailIcon from "../../../assets/iconamoon_email-thin.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const GoogleLogin = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const idToken = await user.getIdToken();
            const baseURl = import.meta.env.VITE_API_URL;

            // Kirim ID token ke backend
            const response = await axios.post(`${baseURl}/auth/google`, {
                idToken
            });

            // ✅ Simpan token dari backend ke localStorage
            const backendToken = response.data?.data?.token;
            if (backendToken) {
                localStorage.setItem('token', backendToken);
            } else {
                throw new Error("Token dari backend tidak ditemukan.");
            }

            navigate("/");
        } catch (error) {
            console.error("Login Google gagal:", error);
        }
    };

    return (
        <div>
            <div className="or-separator">
                <div className="line1"></div>
                <div className="text">Or</div>
                <div className="line2"></div>
            </div>

            <div className="google-button-container">
                <button className="google" onClick={handleGoogleLogin}>
                    <img src={GoogleLogo} width={25} alt="Google Logo" /> With Google
                </button>
                <NavLink to="/register" className="email">
                    <img src={MailIcon} width={25} alt="Mail Icon" /> With Email
                </NavLink>
            </div>
        </div>
    );
};

export default GoogleLogin;
