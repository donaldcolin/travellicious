import React, { useState } from "react";
import "./css/contactus.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks! We will call you shortly.");
  };

  return (
    <div className="contactus-container">
      <h1>Contact Travellicious</h1>
      <div className="contactus-content">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="contactus-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>

        {/* Company Address and Map */}
        <div className="address-map">
          <div className="address-container">
            <h2>Our Address</h2>
            <p>Travellicious Pvt Ltd.</p>
            <p>HSR Layout, Bengaluru, Karnataka, India</p>
            <p>Contact: +91 9876543210</p>
          </div>

          <div className="map-container">
            <h2>Find Us on the Map</h2>
            <iframe
              src="https://www.google.com/maps?q=HSR+Layout,+Bangalore&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Company Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;