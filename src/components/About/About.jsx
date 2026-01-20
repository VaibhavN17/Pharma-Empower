import React, { useState, useEffect } from 'react';
import { Rocket, Heart, Target, ChevronRight, Eye, X, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import aboutHeroImg from '../../images/about_hero.png';
import './About.css';

const About = () => {
  // CMS LOGIC (keeping it for hero content if used)
  const [pageContent, setPageContent] = useState({
    hero: {
      title: 'About Us',
      subtitle: 'Dedicated to advancing the pharmaceutical profession through innovation and community.',
      bgImage: 'https://images.unsplash.com/photo-1555617766-c94804975da3?auto=format&fit=crop&q=80'
    },
    details: {
      mission: 'To empower every pharma professional with the tools and knowledge they need.',
      vision: 'A connected global community driving healthcare forward.'
    }
  });

  useEffect(() => {
    const saved = localStorage.getItem('site_full_content');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.about) {
        setPageContent(prev => ({
          hero: { ...prev.hero, ...parsed.about.hero },
          details: { ...prev.details, ...parsed.about.details }
        }));
      }
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <div className="about-hero">
        <div className="about-hero-card">
          <div className="hero-text-content">
            <h1 className="about-tagline">
              Empowering the <br />
              <span className="highlight-text">Future of Pharmacy</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#555', marginTop: '20px', lineHeight: '1.6' }}>
              We are dedicated to advancing the pharmaceutical profession through
              innovation, education, and community building. Joining hands for a healthier tomorrow.
            </p>
          </div>
          <div className="hero-image-content">
            <img
              src={aboutHeroImg}
              alt="Pharma Empower Team"
              className="about-hero-img"
            />
          </div>
        </div>
      </div>

      {/* NAVIGATION CARDS */}
      <div className="about-nav-container">

        <div className="about-nav-card" onClick={() => window.location.href = '/about/mission'}>
          <div className="card-icon-wrapper">
            <Target size={32} />
          </div>
          <div className="card-content">
            <h3>+ Our Mission</h3>
            <span className="card-subtext">Driving excellence</span>
          </div>
          <div className="nav-arrow">
            <ChevronRight size={20} />
          </div>
        </div>

        <div className="about-nav-card" onClick={() => window.location.href = '/about/values'}>
          <div className="card-icon-wrapper">
            <Heart size={32} />
          </div>
          <div className="card-content">
            <h3>+ Our Values</h3>
            <span className="card-subtext">Integrity & Impact</span>
          </div>
          <div className="nav-arrow">
            <ChevronRight size={20} />
          </div>
        </div>

        <div className="about-nav-card" onClick={() => window.location.href = '/about/purpose'}>
          <div className="card-icon-wrapper">
            <Eye size={32} />
          </div>
          <div className="card-content">
            <h3>+ Our Purpose</h3>
            <span className="card-subtext">Shaping the future</span>
          </div>
          <div className="nav-arrow">
            <ChevronRight size={20} />
          </div>
        </div>

        <div className="about-nav-card" onClick={() => window.location.href = '/about/principles'}>
          <div className="card-icon-wrapper">
            <BookOpen size={32} />
          </div>
          <div className="card-content">
            <h3>+ Our Principles</h3>
            <span className="card-subtext">Core beliefs</span>
          </div>
          <div className="nav-arrow">
            <ChevronRight size={20} />
          </div>
        </div>

      </div>

    </div>
  );
};

export default About;


