import React, { useState } from "react";
import "./css/contactus.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { email, phone } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    if (!phoneRegex.test(phone)) {
      return "Please enter a valid 10-digit phone number.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError(null);
      setMessage(null);

      // Replace the URL below with your actual backend API endpoint
      const response = await fetch("http://localhost:4000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form. Please try again later.");
      }

      setMessage("Thanks! We will call you shortly.");
      setFormData({ name: "", email: "", phone: "" });
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="contactus-container">
      <h1>Contact Travellicious</h1>
      <div className="contactus-content">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="contactus-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />
          </div>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* Success Message */}
          {message && <p className="success-message">{message}</p>}

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