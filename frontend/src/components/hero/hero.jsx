import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./hero.css";
import Trek from "/Users/donaldcolin/travelicious/frontend/src/components/assets/trek.jpeg";

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

      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Travellicious</h1>
        <p className="hero-subtitle">
          Discover amazing destinations and unforgettable experiences.
        </p>

        <p className="hero-subtitle">
      insta 
        </p>
        <p className="hero-subtitle">
   fb
        </p>
        <p className="hero-subtitle">
   youtube
   
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