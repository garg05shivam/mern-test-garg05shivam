import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert("Registration successful! Please log in.");
      navigate("/login");

    } catch (error) {
      const message = error.response?.data?.message || "Please try again.";
      alert(`Registration failed. ${message}`);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
      <h2>Register</h2>
      <p className="auth-subtitle">Create your account to continue.</p>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          className="text-input"
        />

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

        <button type="submit" className="primary-btn">Register</button>
      </form>
      <p className="auth-footer">
        Already registered? <Link to="/login">Login</Link>
      </p>
      </div>
    </div>
  );
}

export default Register;
