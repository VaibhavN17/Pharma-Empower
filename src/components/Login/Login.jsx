import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import { authAPI } from '../../services/api';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'user' // Default role
    });

    const navigate = useNavigate();
    const location = useLocation();

    // ✅ get redirect path (fallback to home)
    const redirectTo = location.state?.from || '/';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await authAPI.login({
                email: formData.email,
                password: formData.password
            });

            if (res.data) {
                const userRole = res.data.user.role;
                const selectedRole = formData.role;

                // Validate Role Selection
                if (selectedRole === 'admin' && userRole !== 'admin') {
                    alert("Access Denied: You do not have Administrator privileges.");
                    return;
                }

                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));

                // ✅ Admin stays same
                if (userRole === 'admin') {
                    navigate('/admin/dashboard', { replace: true });
                }
                // ✅ User redirected back to requested page
                else {
                    navigate(redirectTo, { replace: true });
                }
            }
        } catch (err) {
            console.log(err.message);
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header-section">
                        <h2>Welcome Back</h2>
                        <p>Enter your details to access your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form-global">
                        <div className="form-group">
                            <label>Select Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

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
                            Sign In
                        </button>
                    </form>

                    <div className="login-footer-section">
                        <p>
                            Don't have an account?
                            <button
                                type="button"
                                className="toggle-btn"
                                onClick={() => navigate('/register')}
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
