import React from "react";
import "./newsletter.css";

export const Newsletter = () => {
  return (
    <div className="newsletter">
      {/* Newsletter Header */}
      <div className="newsletter-header">
        <h2>NEWSLETTER</h2>
        <p>
          Discover our all new treks, our latest outings, and get
          flat 5% off your first order by subscribing to our newsletter!
        </p>
      </div>

      {/* Subscription Form */}
      <div className="newsletter-form">
        <input
          type="email"
          placeholder="Type your email address here"
          className="newsletter-input"
        />
        <button className="newsletter-button">Subscribe</button>
      </div>

      {/* Social Media Icons */}
  
    </div>
  );
};