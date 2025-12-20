import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        organizationalNeed: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you for contacting us! We will get back to you soon.');
        // Reset form
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            organizationalNeed: ''
        });
    };

    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1>Ready to Connect</h1>
                <p>We’re here to support your career growth and your organization's operational needs.</p>
            </div>

            <div className="contact-form-wrapper">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name <span className="required">*</span></label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your Name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email <span className="required">*</span></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Your Email Address"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject">Subject <span className="required">*</span></label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="Subject of your inquiry"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="organizationalNeed">Organizational Need <span className="optional">(Optional)</span></label>
                        <input
                            type="text"
                            id="organizationalNeed"
                            name="organizationalNeed"
                            value={formData.organizationalNeed}
                            onChange={handleChange}
                            placeholder="Describe your organizational need"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message <span className="required">*</span></label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Your Message..."
                            rows="5"
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-btn">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
