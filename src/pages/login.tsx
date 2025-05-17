import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import logo from "../assets/images/logo.png";

export function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusField, setFocusField] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.username.trim()) validationErrors.username = "Username is required";
    if (!formData.password.trim()) validationErrors.password = "Password is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await fetch("http://localhost:5001/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (!response.ok) {
          alert(data.message || "Login failed.");
        } else {
          localStorage.setItem(
            "user",
            JSON.stringify({
              username: data.username,
              role: data.role,
              token: data.token,
            })
          );
          
          // Success animation before redirect
          document.querySelector('.login-box').classList.add('animate__animated', 'animate__bounce');
          setTimeout(() => {
            alert(`Logged in as ${data.role}`);
            navigate("/");
          }, 1000);
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred during login. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="background-pattern"></div>
      <div className="login-box animate__animated animate__fadeIn">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img animate__animated animate__zoomIn" />
          <div className="logo-glow"></div>
        </div>
        
        <h2 className="text-center mb-4">
          <span className="title-text">Welcome Back</span>
          <div className="title-underline"></div>
        </h2>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className={`input-group ${errors.username ? 'error' : ''} ${focusField === 'username' ? 'focused' : ''}`}>
            <label className="input-label">Username</label>
            <div className="input-wrapper">
              <input
                type="text"
                name="username"
                className="input-field"
                value={formData.username}
                onChange={handleChange}
                onFocus={() => setFocusField('username')}
                onBlur={() => setFocusField(null)}
              />
              <span className="input-highlight"></span>
            </div>
            {errors.username && <p className="error-text">{errors.username}</p>}
          </div>

          <div className={`input-group ${errors.password ? 'error' : ''} ${focusField === 'password' ? 'focused' : ''}`}>
            <label className="input-label">Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                name="password"
                className="input-field"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusField('password')}
                onBlur={() => setFocusField(null)}
              />
              <span className="input-highlight"></span>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <button 
            type="submit" 
            className={`login-btn ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="spinner"></span>
            ) : (
              <>
                <span>Sign In</span>
                <svg className="arrow-icon" viewBox="0 0 24 24">
                  <path d="M4 12h16m-7-7l7 7-7 7"/>
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <p className="signup-link">
          Don't have an account? <Link to="/signup" className="signup-link-text">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}