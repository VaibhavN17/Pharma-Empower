import React, { useState } from "react";
import "./studentSession.css";
import { sessionAPI } from "../../services/api";


const StudentSession = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    topic: "",
    date: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, topic, date, phone} = formData;

    if (!fullName  || !topic || !date || !phone) {
      alert("All fields are required");
      return;
    }

    try {
      const res=await sessionAPI.createSession(formData);
      console.log(res.data);
      if(res.message){
           alert("Session request submitted successfully");

        setFormData({
        fullName: "",
        topic: "",
        date: "",
        phone: "",
        });
      }
    
    } catch (error) {
      console.error(error);
      alert("Failed to submit session");
    }
  };

  return (
    <div className="session-container">
      <div className="session-card">
        <h2>Request a Session</h2>

        <form onSubmit={handleSubmit} className="session-form">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <textarea
            name="topic"
            placeholder="Why do you need this session?"
            rows="3"
            value={formData.topic}
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default StudentSession;
