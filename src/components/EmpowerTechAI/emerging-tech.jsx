import { useState } from 'react';
import { Link } from 'react-router-dom';
import './EmpowerTechAI.css';

const EmpowerTechAI = () => {
    const [isLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

    if (!isLoggedIn) {
        return (
            <div className="empower-login-container">
                <div className="empower-login-card">
                    <h2>Empower Tech & AI</h2>
                    <p>Explore Revolutionary Technologies</p>
                    <Link to="/login" className="empower-login-btn">
                        Login to Access Emerging Tech
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div className="emerging-tech-page">

            <div className="et-layout">
                {/* LEFT: HERO SECTION */}
                <div className="et-hero">
                    <h1>Empower – Tech & AI</h1>
                    <p className="et-subtitle">
                        Track innovation shaping the future of healthcare
                    </p>
                    <p className="et-description">
                        Enabling the future of healthcare through technology,
                        innovation, and artificial intelligence.
                    </p>
                </div>

                {/* RIGHT: EMERGING TECHNOLOGIES GRID */}
                <div className="et-content">
                    <h2 className="et-heading">Emerging Technologies in Pharma</h2>

                    <div className="tech-cards compact-grid">
                        <div className="tech-card">
                            <h3>Peptides</h3>
                            <p>Targeted therapies improving precision treatment.</p>
                        </div>

                        <div className="tech-card">
                            <h3>Devices</h3>
                            <p>Smart devices for monitoring and diagnostics.</p>
                        </div>

                        <div className="tech-card">
                            <h3>mRNA</h3>
                            <p>Revolutionizing vaccines and therapeutics.</p>
                        </div>

                        <div className="tech-card">
                            <h3>Personalized Medicine</h3>
                            <p>Data-driven treatments tailored to individuals.</p>
                        </div>

                        <div className="tech-card">
                            <h3>Artificial Intelligence</h3>
                            <p>Accelerating research and clinical decisions.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
export default EmpowerTechAI;