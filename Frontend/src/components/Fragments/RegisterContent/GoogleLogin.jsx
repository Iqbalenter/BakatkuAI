import GoogleLogo from "../../../assets/devicon_google.png";
import MailIcon from "../../../assets/iconamoon_email-thin.png"
import { auth, provider } from "../../../config/firebase"; // sesuaikan path
import { signInWithPopup, getIdToken } from "firebase/auth";
import { useNavigate } from "react-router-dom";
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
                <div class="line1"></div>
                <div class="text">Or</div>
                <div class="line2"></div>
            </div>


            <div className="google-button-container">
                <button className="google" onClick={handleGoogleLogin}><img src={GoogleLogo} width={25}/>With Google</button>
            </div>
        </div>
    )
}

export default GoogleLogin;