import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login/register logic
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', formData.name || formData.email.split('@')[0]);

        // Redirect to previous page or home
        // For now, let's go back one step to return to the gated content, 
        // or default to home if no history (though -1 works well for "redirected to login")
        navigate(-1);
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header-section">
                        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                        <p>{isLogin ? 'Enter your details to access your account' : 'Join us to unlock exclusive content'}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form-global">
                        {!isLogin && (
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="login-submit-btn">
                            {isLogin ? 'Sign In' : 'Register'}
                        </button>
                    </form>

                    <div className="login-footer-section">
                        <p>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button type="button" className="toggle-btn" onClick={toggleMode}>
                                {isLogin ? 'Sign Up' : 'Log In'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
