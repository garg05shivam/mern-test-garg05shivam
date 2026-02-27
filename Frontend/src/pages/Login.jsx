import {useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/auth/login`,
                formData
            );
            localStorage.setItem("token", response.data.token);
            alert("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            const message = error.response?.data?.message || "Please try again.";
            alert(`Login failed. ${message}`);
        }
    }
    return (
        <div className="auth-page">
            <div className="auth-card">
            <h2>Login</h2>
            <p className="auth-subtitle">Sign in to manage your courses.</p>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="text-input"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="text-input"
                />
                <button type="submit" className="primary-btn">Login</button>
            </form>
            <p className="auth-footer">
                New user? <Link to="/register">Create an account</Link>
            </p>
            </div>
        </div>
    );
}   
export default Login;
