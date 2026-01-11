import React, { useState, useEffect } from 'react';
import { Rocket, Heart, Target, ChevronRight, Eye } from 'lucide-react';
import Principles from './Principles';
import Mission from './Mission';
import Value from './Value';
import Purpose from './Purpose';
import aboutHeroImg from '../../images/about_hero.png';
import './About.css';

const About = () => {
  // CMS LOGIC
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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="about-page">

      {/* HER0 SECTION */}
      <div
        className="about-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${pageContent.hero.bgImage})`
        }}
      >
        <div className="hero-content">
          <h1>{pageContent.hero.title}</h1>
          <p>{pageContent.hero.subtitle}</p>
        </div>
      </div>

      {/* NAVIGATION CARDS */}
      <div className="about-nav-container">
        <div className="nav-cards">
          <div className="nav-card" onClick={() => scrollToSection('mission')}>
            <Target className="card-icon" />
            <h3>Our Mission</h3>
            <p>Driving excellence in pharma education</p>
          </div>
          <div className="nav-card" onClick={() => scrollToSection('vision')}>
            <Eye className="card-icon" />
            <h3>Our Vision</h3>
            <p>Shaping the future of healthcare</p>
          </div>
          <div className="nav-card" onClick={() => scrollToSection('values')}>
            <Heart className="card-icon" />
            <h3>Core Values</h3>
            <p>Integrity, Innovation, Impact</p>
          </div>
        </div>
      </div>

      {/* CONTENT SECTIONS */}
      <section id="mission" className="content-section mission-section">
        <div className="section-content">
          <div className="text-col">
            <h2>Our Mission</h2>
            <p>{pageContent.details.mission}</p>
          </div>
          <div className="image-col">
            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80" alt="Mission" />
          </div>
        </div>
      </section>

      <section id="vision" className="content-section vision-section reverse">
        <div className="section-content">
          <div className="image-col">
            <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80" alt="Vision" />
          </div>
          <div className="text-col">
            <h2>Our Vision</h2>
            <p>{pageContent.details.vision}</p>
          </div>
        </div>
      </section>

      {/* Added for anchor to work with legacy code or layout if needed */}
      <div id="values"></div>
    </div>
  );
};

export default About;
