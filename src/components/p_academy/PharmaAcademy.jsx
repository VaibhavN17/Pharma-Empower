import React, { useState } from 'react';
import './PharmaAcademy.css';
import { Link } from 'react-router-dom';

const PharmaAcademy = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulation of login - accept any input for now
        if (credentials.username && credentials.password) {
            setIsLoggedIn(true);
        } else {
            alert("Please enter any username and password to proceed.");
        }
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    if (!isLoggedIn) {
        return (
            <div className="academy-login-container">
                <div className="academy-login-card">
                    <div className="login-header">
                        <h2>Pharma Empower Academy</h2>
                        <p>Unlock Your Potential</p>
                    </div>
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="input-group">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={credentials.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="login-btn">
                            Enter Academy
                            <span className="btn-icon">→</span>
                        </button>
                    </form>
                    <div className="login-footer">
                        <p>Restricted Access - Transformation Ahead</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="academy-dashboard">
            {/* Header Section */}
            <header className="academy-header">
                <div className="header-content">
                    <h1>The Pharma Academy</h1>
                    <p className="subtitle">Skill Development & Training</p>
                </div>
                <div className="ticker-wrapper">
                    <div className="ticker-text">
                        Certification That Translates to Career Advancement — Leveraged by Top Consultants — Industry Verified Methodologies —
                        Certification That Translates to Career Advancement — Leveraged by Top Consultants — Industry Verified Methodologies
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="academy-main">

                {/* Introduction */}
                <section className="academy-intro">
                    <div className="intro-card">
                        <h2>Real World Skills. Real World Results.</h2>
                        <p>
                            Move beyond theory. The Pharma Academy offers meticulously structured, industry-verified courses designed to deliver practical, deployable skills.
                            Our curriculum is built on the methodologies used by veteran Subject matter industry experts and consultants who drive success in multi-national organizations.
                            Learn not just the "what," but the "how to implement" at the highest level.
                        </p>
                        <p>
                            As people development specialists, the emphasis is always on people. Our programs are learner designed, learner driven and learner focused.
                            We get results because we pay attention to what our clients need. We aim to deliver a positive experience that empowers the individual,
                            while creating a thirst for knowledge and a hunger for further learning.
                        </p>
                        <p>
                            Driven by a true enthusiasm for learning, our trainers and facilitators constantly up-skill themselves, ensuring that Empower courses maintain the highest possible standards.
                        </p>
                        <p>
                            Pharma Empower Solutions (PES) are committed to helping people achieve specific, tangible, measurable results.
                            We understand that individuals will have specific desired learning outcomes from our courses so we try to ensure that each person is equipped with a tailored practical plan of action that can be implemented after the course.
                            We believe in providing a full service, which is why our clients find our aftercare service every bit as satisfying as the experience on our programmes.
                        </p>
                    </div>
                </section>

                {/* Resource Grid */}
                <section className="resource-grid">

                    <div className="resource-card animate-card">
                        <div className="card-icon">🌍</div>
                        <h3>Glance of Pharma World</h3>
                        <p className="card-desc">For Students, Enthusiasts, and Entry Level Professionals.</p>
                        <p className="coming-soon">Content Coming Soon...</p>
                    </div>

                    <div className="resource-card animate-card delay-1">
                        <div className="card-icon">🚀</div>
                        <h3>Uplift Pharma Career</h3>
                        <p className="card-desc">Strategic guidance to accelerate your professional journey.</p>
                        <p className="coming-soon">Content Coming Soon...</p>
                    </div>

                    <div className="resource-card animate-card delay-2">
                        <div className="card-icon">📚</div>
                        <h3>Upskill Resources</h3>
                        <p className="card-desc">Curated online sites for upskilling and continuous learning.</p>
                        <ul className="resource-links">
                            <li><a href="#" onClick={(e) => e.preventDefault()}>Coursera Pharma</a></li>
                            <li><a href="#" onClick={(e) => e.preventDefault()}>edX Life Sciences</a></li>
                            <li><a href="#" onClick={(e) => e.preventDefault()}>FDA Training</a></li>
                        </ul>
                    </div>

                    <div className="resource-card animate-card delay-3">
                        <div className="card-icon">🔍</div>
                        <h3>Empower Hunting Resources</h3>
                        <p className="card-desc">Top job portals to find your next opportunity.</p>
                        <ul className="resource-links">
                            <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                            <li><a href="https://www.naukri.com" target="_blank" rel="noopener noreferrer">Naukri</a></li>
                            <li><a href="https://www.foundit.in" target="_blank" rel="noopener noreferrer">FoundIt (Monster)</a></li>
                        </ul>
                    </div>

                </section>

            </main>
        </div>
    );
};

export default PharmaAcademy;
