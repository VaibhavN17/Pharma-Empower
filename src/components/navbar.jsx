import React, { useState } from 'react';
import './navbar.css';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="navbar-container">
            <div className="navbar-content">
                <div className="navbar-left">
                    <a href="/" className="navbar-logo">
                        Pharma Empower
                    </a>
                </div>

                <div className="menu-icon" onClick={toggleMenu}>
                    <div className={isMobileMenuOpen ? "hamburger open" : "hamburger"}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div className={isMobileMenuOpen ? "nav-menu active" : "nav-menu"}>
                    <div className="navbar-center">
                        <ul className="nav-links">
                            <li><a href="#about" className="nav-link active" onClick={toggleMenu}>About Us</a></li>
                            <li><a href="#int-hub" className="nav-link" onClick={toggleMenu}>Intelligence Hub</a></li>
                            <li><a href="#empower-ai" className="nav-link" onClick={toggleMenu}>Empower Tech & AI</a></li>
                            <li><a href="#pharma-academy" className="nav-link" onClick={toggleMenu}>Pharma Empower Academy</a></li>
                            <li><a href="#professional-network" className="nav-link" onClick={toggleMenu}>Professional Network</a></li>
                            {/* Mobile specific Contact Link */}
                            <li className="mobile-only"><a href="#contact-us" className="nav-link" onClick={toggleMenu}>Contact Us</a></li>
                        </ul>
                    </div>

                    <div className="navbar-right">
                        <ul className="utility-links">
                            <li className="desktop-only"><a href="#contact-us" className="utility-link">Contact Us</a></li>
                                {/* <li><a href="#global" className="utility-link">GLOBAL</a></li>
                                <li><a href="#search" className="utility-link">SEARCH</a></li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
