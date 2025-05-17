import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
import logo from '../assets/images/logo.png';

export function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: ''
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
        if (!formData.role) validationErrors.role = "Role is required";

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            try {
                const response = await fetch("http://localhost:5001/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();
                if (!response.ok) {
                    alert(data.message || "Signup failed.");
                } else {
                    // Success animation before redirect
                    document.querySelector('.signup-box').classList.add('animate__animated', 'animate__bounce');
                    setTimeout(() => navigate('/login'), 1000);
                }
            } catch (err) {
                console.error(err);
                alert("Error signing up. Try again later.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="signup-container">
            <div className="background-pattern"></div>
            <div className="signup-box animate__animated animate__fadeIn">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo-img animate__animated animate__zoomIn" />
                    <div className="logo-glow"></div>
                </div>
                
                <h2 className="text-center mb-4">
                    <span className="title-text">Join Our Community</span>
                    <div className="title-underline"></div>
                </h2>
                
                <form className="signup-form" onSubmit={handleSubmit}>
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

                    <div className={`input-group role-group ${errors.role ? 'error' : ''}`}>
                        <label className="input-label">Select Role</label>
                        <div className="role-options">
                            {['Coach', 'Player'].map((option) => (
                                <label 
                                    key={option}
                                    className={`role-option ${formData.role === option ? 'selected' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name="role"
                                        value={option}
                                        checked={formData.role === option}
                                        onChange={handleChange}
                                    />
                                    <div className="role-card">
                                        <div className="role-icon">
                                            {option === 'Coach' ? (
                                                <svg viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>
                                            ) : (
                                                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                                            )}
                                        </div>
                                        <span className="role-title">{option}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                        {errors.role && <p className="error-text">{errors.role}</p>}
                    </div>

                    <button 
                        type="submit" 
                        className={`signup-btn ${isSubmitting ? 'loading' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="spinner"></span>
                        ) : (
                            <>
                                <span>Get Started</span>
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

                <p className="login-link">
                    Already a member? <Link to="/login" className="login-link-text">Sign In</Link>
                </p>
            </div>
        </div>
    );
}