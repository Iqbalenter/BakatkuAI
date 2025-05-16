import { useState } from "react";
import api from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router";

const FormLogin = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post(`${import.meta.env.VITE_API_URL}/login`, { email, password });

            if (response.status === 200) {
                const { token, id } = response.data.data;

                
                localStorage.setItem("token", token);
                localStorage.setItem("userId", id);

                
                navigate("/");
            } else {
                setError(response.data.data.message || "Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.data?.message || "An error occurred during login.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-form-container">
            <div className="login-title">
                <h3>Login</h3>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                    <div className="spinner"></div>
                </div>
            ) : (
            <div className="login-form">
                <form onSubmit={handleLogin}>
                    <div className="form-container">
                        <div className="input-box">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-box">
                            <input
                                className="password-input"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
                                {showPassword ? "🙈" : "👁️"}
                            </span>
                        </div>
                        {error && <p className="error-message">{error}</p>}

                        <NavLink to="/forgot-password">Forgot Password?</NavLink>
                    </div>

                    <div className="login-button-container">
                        <button type="submit" className="login-button">Next</button>
                    </div>
                </form>
            </div>
            )}
        </div>
    );
};

export default FormLogin;
