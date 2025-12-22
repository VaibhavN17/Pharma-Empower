import React from 'react';
import './skillBoard.css';

const SkillBoard = () => {
    // Data for Traditional Career-Level Skills
    const traditionalSkills = [
        {
            title: "Initial Career Stage (Students/Entry-Level)",
            description: "These skills are crucial for landing your first role (e.g., QC Analyst, Lab Technician, Pharmacy Assistant, Entry-Level CRA).",
            data: [
                { id: 1, skill: "Pharmaceutical Knowledge & Drug Science", resource: "Academic Degree, Industry News" },
                { id: 2, skill: "Good Manufacturing Practices (GMP)", resource: "NSF, Inspired Pharma Training" },
                { id: 3, skill: "Laboratory Skills (e.g., Chromatography, Titration)", resource: "University Labs, Practical Training Courses" },
                { id: 4, skill: "Attention to Detail & Accuracy (GRK)", resource: "Online GMP Training courses on record-keeping" },
                { id: 5, skill: "Basic Regulatory Awareness (SOPs, documentation)", resource: "Cobblestone Training, NSF Regulatory courses" },
                { id: 6, skill: "Teamwork & Collaboration", resource: "University Projects, Internships" },
                { id: 7, skill: "Communication Skills (Verbal & Written)", resource: "PlatPharm (Soft Skills Modules)" },
                { id: 8, skill: "Analytical & Critical Thinking", resource: "Technical Training, Case Studies" },
                { id: 9, skill: "Data Entry/Data Management Skills", resource: "Basic MS Excel, Safety Database familiarity (e.g., Argus)" },
                { id: 10, skill: "Ethical & Legal Awareness", resource: "Professional Ethics Courses, PCI Guidelines (India)" }
            ]
        },
        {
            title: "Interim Career Stage (Mid-Level Professionals)",
            description: "These skills are necessary for advancing into specialist, managerial, or supervisory roles (e.g., Regulatory Affairs Manager, Senior CRA, Project Lead, Territory Manager).",
            data: [
                { id: 1, skill: "Project Management (Drug Development/Clinical Trials)", resource: "Professional Certifications (e.g., PMP), GetReskilled" },
                { id: 2, skill: "Regulatory Acumen (ICH, GVP, FDA/EMA/CDSCO)", resource: "NSF Regulatory Training, RAPS Certification" },
                { id: 3, skill: "Data Analysis & Interpretation", resource: "Advanced Excel, introductory R/Python for data-heavy roles, Coursera Data Science courses" },
                { id: 4, skill: "Leadership & Mentoring (Team Management)", resource: "Internal Company Training, Management Workshops" },
                { id: 5, skill: "Strategic Thinking (vs. purely operational)", resource: "PlatPharm Management Training, Pharma Executive Education" },
                { id: 6, skill: "Interpersonal & Relationship Building (Stakeholder Mgmt.)", resource: "Sales/Commercial Training, Networking on LinkedIn" },
                { id: 7, skill: "Medical/Technical Writing", resource: "Cobblestone Training (SOPs/Documentation), Specialist Medical Writing Courses" },
                { id: 8, skill: "Process Validation & Qualification", resource: "GetReskilled (Validation Courses), NSF Qualification Training" },
                { id: 9, skill: "Continuous Improvement (e.g., Lean, Six Sigma)", resource: "Quality Management Certifications" },
                { id: 10, skill: "Negotiation & Conflict Resolution", resource: "Business Skills Training, Leadership Programs" }
            ]
        },
        {
            title: "Senior Level Career Stage (Executives/Leaders)",
            description: "These are high-level skills required for C-suite or VP roles, focusing on governance, market strategy, and organizational vision.",
            data: [
                { id: 1, skill: "Visionary & Strategic Leadership", resource: "Executive MBA (Pharma/Healthcare focus), Harvard/Wharton Programs" },
                { id: 2, skill: "Business Acumen & Financial Literacy", resource: "Understanding P&L, Market Access, Pricing Models (MBA/Finance training)" },
                { id: 3, skill: "Global Regulatory & Compliance Mastery", resource: "Advanced Certifications (RAPS), Internal Audit/Governance experience" },
                { id: 4, skill: "Scientific & Technological Acumen (AI, Genomics, Digital Health)", resource: "Industry Conferences, Advanced Coursera Specializations" },
                { id: 5, skill: "Stakeholder Engagement & Public Speaking", resource: "External Board Roles, Crisis Communication Training" },
                { id: 6, skill: "People Management & Emotional Intelligence (EQ)", resource: "360-degree Feedback, Executive Coaching" },
                { id: 7, skill: "Risk Management & Scenario Planning", resource: "Specialized Risk Certification (e.g., Quality Risk Management)" },
                { id: 8, skill: "Innovation & Digital Transformation", resource: "Industry Forums (e.g., FiercePharma News), Tech Strategy Courses" },
                { id: 9, skill: "M&A/Due Diligence Expertise", resource: "Financial/Legal Workshops on Mergers" },
                { id: 10, skill: "Culture Building (Quality & Compliance Culture)", resource: "Organizational Leadership Training" }
            ]
        }
    ];

    // Data for Pharma 4.0 Skills
    const pharma40Skills = [
        {
            title: "Initial Career Stage (New Graduates, Junior Roles)",
            data: [
                { id: 1, skill: "Data Fluency (Handling large datasets)", resource: "Coursera / edX (Introduction to AI/ML, Python/R)" },
                { id: 2, skill: "Basic Programming (Python/R fundamentals)", resource: "NPTEL/Swayam (AI in Drug Discovery)" },
                { id: 3, skill: "Smart Automation Awareness (RPA basics)", resource: "Innopharma Education (AI and Automation in Life Sciences)" },
                { id: 4, skill: "Digital Health Tool Use (EHR, Telepharmacy platforms)", resource: "LinkedIn Learning (Data Analysis Fundamentals)" },
                { id: 5, skill: "Good Data Practices (GCP/GAMP)", resource: "Coursera / edX" },
                { id: 6, skill: "Intro to Machine Learning (ML) concepts", resource: "Coursera / edX" },
                { id: 7, skill: "Cloud Computing Basics (AWS/Azure for data storage)", resource: "AWS / Azure Fundamentals" },
                { id: 8, skill: "Data Visualization (Tableau, Power BI)", resource: "DataCamp / Tableau Training" },
                { id: 9, skill: "Robotics Application in Lab/Warehouse (basic operations)", resource: "Online Robotics Courses" },
                { id: 10, skill: "Cybersecurity Awareness (Data privacy/HIPAA/GDPR)", resource: "Cybersecurity Basics Courses" }
            ]
        },
        {
            title: "Interim Career Stage (Specialists, Managers, Project Leads)",
            data: [
                { id: 1, skill: "AI/ML Model Interpretation (Translating results for domain experts)", resource: "MIT xPRO / Stanford (AI in Healthcare/Pharma courses)" },
                { id: 2, skill: "Data Governance & Quality", resource: "GetReskilled (Process Validation & Digital Courses)" },
                { id: 3, skill: "Process Automation Design (Identifying areas for RPA/robotics implementation)", resource: "BioSpace (News on AI adoption & partnerships)" },
                { id: 4, skill: "AI for Clinical Trials (Patient recruitment, data monitoring)", resource: "RAPS/NSF (Regulatory implications of AI/Digital tools)" },
                { id: 5, skill: "Pharmacovigilance Data Mining (AI in Adverse Event detection)", resource: "Specialized PV Training" },
                { id: 6, skill: "Cloud & System Architecture (Managing large-scale data systems)", resource: "Cloud Architect Certifications" },
                { id: 7, skill: "Computational Drug Design (Basic QSAR, Virtual Screening tools)", resource: "Computational Chemistry Courses" },
                { id: 8, skill: "IoT/Sensor Data Analysis (Smart manufacturing/logistics)", resource: "IoT Training Programs" },
                { id: 9, skill: "Digital Therapeutics (DTx) Understanding", resource: "DTx Alliance Resources" },
                { id: 10, skill: "Vendor & Tech Partner Management", resource: "IT Management Courses" }
            ]
        },
        {
            title: "Senior Level Career Stage (Executives, Directors)",
            data: [
                { id: 1, skill: "AI Strategy & Roadmap Development (Integrating AI across the value chain)", resource: "MIT Sloan / Harvard Medical School (Executive Education Programs)" },
                { id: 2, skill: "Ethical AI & Bias Mitigation (Focus on patient safety and equity)", resource: "DigitalDefynd (Curated lists of executive AI courses)" },
                { id: 3, skill: "Digital Transformation Leadership (Driving cultural and operational change)", resource: "FiercePharma & PharmaVoice (Industry news and executive insights)" },
                { id: 4, skill: "Investment & ROI Modeling for AI/Robotics", resource: "Consulting Firms (McKinsey, BCG) White Papers" },
                { id: 5, skill: "Regulatory Strategy for AI/SaMD (Software as a Medical Device)", resource: "Regulatory Strategy Workshops" },
                { id: 6, skill: "Talent Strategy & Reskilling (Managing the AI skills gap)", resource: "HR Strategy Forums" },
                { id: 7, skill: "Generative AI Applications (Drug/molecule design, content creation)", resource: "GenAI Specialized Courses" },
                { id: 8, skill: "Pharma 4.0 Ecosystem Understanding (Integration of IoT, Robotics, AI)", resource: "Pharma 4.0 Conferences (ISPE)" },
                { id: 9, skill: "M&A/Venture Capital in HealthTech", resource: "HealthTech Investment Forums" },
                { id: 10, skill: "Data Privacy & Global Compliance (Deep understanding of complex regulations)", resource: "Global Privacy Summits" }
            ]
        }
    ];

    return (
        <div className="skill-board-page">
            {/* Header / Hero Section */}
            <div className="skill-board-hero">
                <div className="skill-board-icon-container">
                    {/* Suitcase Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                </div>
                <h1 className="skill-board-title">Pharma & Healthcare Skill Board</h1>
                <p className="skill-board-subtitle">
                    Your single access point for high-impact pharma jobs and validated upskilling resources.
                </p>
                {/* Login button removed as requested */}
            </div>

            {/* Job Focus Areas Section */}
            <div className="job-focus-section">
                <h2 className="job-focus-title">Top Job Focus Areas</h2>

                <div className="job-focus-grid">
                    {/* Card 1: AI/ML in R&D */}
                    <div className="job-card">
                        <div className="job-card-icon">
                            {/* Search/Magnifying Glass Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                        <h3>AI/ML in R&D</h3>
                        <span className="job-card-count">100+ Jobs</span>
                    </div>

                    {/* Card 2: GxP/Data Integrity */}
                    <div className="job-card">
                        <div className="job-card-icon">
                            {/* Monitor Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                <line x1="12" y1="17" x2="12" y2="21"></line>
                            </svg>
                        </div>
                        <h3>GxP/Data Integrity</h3>
                        <span className="job-card-count">250+ Jobs</span>
                    </div>

                    {/* Card 3: Pharma 4.0 Digital */}
                    <div className="job-card">
                        <div className="job-card-icon">
                            {/* Code/Digital Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="16 18 22 12 16 6"></polyline>
                                <polyline points="8 6 2 12 8 18"></polyline>
                            </svg>
                        </div>
                        <h3>Pharma 4.0 Digital</h3>
                        <span className="job-card-count">150+ Jobs</span>
                    </div>

                    {/* Card 4: Global Regulatory Affairs */}
                    <div className="job-card">
                        <div className="job-card-icon">
                            {/* Book/Docs Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                            </svg>
                        </div>
                        <h3>Global Regulatory Affairs</h3>
                        <span className="job-card-count">300+ Jobs</span>
                    </div>
                </div>
            </div>

            {/* Traditional Skills Table Section */}
            <div className="skill-table-section">
                <div className="table-group-header">
                    <h2>Traditional Career-Level Skills & Resources</h2>
                </div>
                {traditionalSkills.map((section, index) => (
                    <div className="table-category" key={index}>
                        <h3>{section.title}</h3>
                        <table className="skill-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '50px' }}>#</th>
                                    <th>Core Skill</th>
                                    <th>Resource Focus</th>
                                </tr>
                            </thead>
                            <tbody>
                                {section.data.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.skill}</td>
                                        <td>{row.resource}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>

            {/* Pharma 4.0 Skills Table Section */}
            <div className="skill-table-section" style={{ backgroundColor: '#fff' }}>
                <div className="table-group-header">
                    <h2>AI, Digital, & Robotics (Pharma 4.0) Skills</h2>
                </div>
                {pharma40Skills.map((section, index) => (
                    <div className="table-category" key={index}>
                        <h3>{section.title}</h3>
                        <table className="skill-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '50px' }}>#</th>
                                    <th>Core Skill</th>
                                    <th>Resource Focus</th>
                                </tr>
                            </thead>
                            <tbody>
                                {section.data.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.skill}</td>
                                        <td>{row.resource}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillBoard;
