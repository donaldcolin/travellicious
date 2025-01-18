import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./hero.css";
import Trek from "/Users/donaldcolin/travelicious/frontend/src/component/assets/trek.jpeg";
import {Instagram, Facebook,Youtube} from 'lucide-react';

 export const Hero = () => {
  const handleScrollToTreks = () => {
    const trekSection = document.getElementById("treks-section");
    if (trekSection) {
      trekSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero">
      {/* Background Image */}
      <div
        className="hero-background"
        style={{ backgroundImage: `url(${Trek})` }}
      ></div>

      {/* Translucent Overlay */}
      <div className="hero-overlay"></div>

      {/* Social Media Icons */}
      <div className="social-icons">
        <a href="#" className="social-icon">
          <Instagram className="w-6 h-6 hover:scale-125 transition-transform" />
        </a>
        <a href="#" className="social-icon">
          <Facebook className="w-6 h-6 hover:scale-125 transition-transform" />
        </a>
        <a href="#" className="social-icon">
          <Youtube className="w-6 h-6 hover:scale-125 transition-transform" />
        </a>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Travellicious</h1>
        <p className="hero-subtitle">
          Discover amazing destinations and unforgettable experiences.
        </p>
        
        {/* Buttons */}
        <div className="hero-buttons">
          <button className="hero-button" onClick={handleScrollToTreks}>
            Explore Treks
          </button>
          <Link to="/outings">
            <button className="hero-button">Explore Outings</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

