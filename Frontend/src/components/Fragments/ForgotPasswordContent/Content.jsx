import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Tambahkan ini
import axios from "axios";
import MailLogo from "../../../assets/ic_baseline-email.png";
import VerticalIcon from "../../../assets/vertical-line.png";
import Image from "../../Elements/Image/Index";

const Content = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Inisialisasi useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/forgot-password`, { email });

            // Tampilkan alert
            alert(response.data.data.message || "Email sent successfully");

            // Redirect ke /login
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.data?.message || "Terjadi kesalahan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-content">
            <div className="forgot-password-title">
                <h1>Lupa Password?</h1>
                <p>Kami akan mengirimkan instruksi untuk mengatur ulang password Anda.</p>
            </div>

            <div className="forgot-password-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-container">
                        <div className="input-box">
                            <span className="icon">
                                <Image width={17} src={MailLogo} />
                            </span>
                            <span className="icon-v">
                                <Image src={VerticalIcon} />
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Masukkan email Anda"
                                required
                            />
                        </div>
                    </div>

                    <div className="profile-button">
                        <button
                            className="profile-edit-button"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Mengirim..." : "Send"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Content;
