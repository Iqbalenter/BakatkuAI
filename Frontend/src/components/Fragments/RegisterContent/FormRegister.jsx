import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MailLogo from "../../../assets/ic_baseline-email.png";
import PasswordLogo from "../../../assets/mdi_password.png";
import VerticalIcon from "../../../assets/vertical-line.png";
import ShowIcon from "../../../assets/show.png";
import HiddenIcon from "../../../assets/hidden.png";
import PersonIcon from "../../../assets/wpf_name.png";
import { Heading3 } from "../../Elements/Heading/Index";
import Image from "../../Elements/Image/Index";

const FormRegister = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name || !email || !password) {
            setErrorMessage('All fields must be filled in!');
            return;
        }

        setLoading(true); // Mulai loading
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, { name, email, password });
            if (response.status === 201) {
                setSuccessMessage(response.data.message);
                setTimeout(() => {
                    navigate('/verification');
                }, 2000);
            } else {
                setErrorMessage(response.data.data.message);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            if (error.response && error.response.data && error.response.data.data.message) {
                setErrorMessage(error.response.data.data.message);
            } else {
                setErrorMessage("An error occurred during registration, try again.");
            }
        } finally {
            setLoading(false); // Selesai loading
        }
    };


    return (
        <div className="register-form-container">
            
            <div className="register-title">
                <Heading3>Register</Heading3>
            </div>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                    <div className="spinner"></div>
                </div>
            ) : (
            <div className="register-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-container">
                        <div className="input-box">
                            <span className="icon"><Image width={20} src={PersonIcon} /></span>
                            <span className="icon-v"><Image src={VerticalIcon} /></span>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="input-box">
                            <span className="icon"><Image src={MailLogo} /></span>
                            <span className="icon-v"><Image src={VerticalIcon} /></span>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input-box">
                            <span className="icon"><Image src={PasswordLogo} /></span>
                            <span className="icon-v"><Image src={VerticalIcon} /></span>
                            <input
                                className="password-input"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className="toggle-password"
                                onClick={togglePasswordVisibility}
                                style={{ cursor: "pointer" }}
                            >
                                <Image src={showPassword ? HiddenIcon : ShowIcon} width={20} />
                            </span>
                        </div>
                    </div>

                    {/* Pesan Error dan Success */}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}

                    <div className="register-button-container">
                        <button type="submit" className="register-button">Next</button>
                    </div>
                </form>
            </div>
            )}
        </div>
    );
};

export default FormRegister;
