import React from "react";
import "./css/aboutus.css";

export const AboutUs = () => {
  return (
    <div className="aboutus-container">
      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h1>About Us</h1>
          <p>
            Welcome to <strong>Travellicious</strong>. We are dedicated to delivering the best products and services tailored
            to our customers' needs. Our team believes in innovation, integrity, and excellence, and we strive to create
            a lasting impact in the industry.
          </p>
        </div>
        <div className="about-image">
          <img src="https://via.placeholder.com/400" alt="About Us" />
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-image">
          <img src="https://via.placeholder.com/400" alt="Our Mission" />
        </div>
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            Our mission is to create value for our customers by providing innovative solutions and building long-term
            relationships. We aim to empower businesses and individuals to achieve their goals through our products and
            services.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          {/* Team Member 1 */}
          <div className="team-member">
            <div className="team-member-image">
              <img src="https://via.placeholder.com/400" alt="Chidanandha" />
            </div>
            <div className="team-member-content">
              <h3>Chidanandha</h3>
              <p>CEO</p>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="team-member">
            <div className="team-member-content">
              <h3>Donald Colin</h3>
              <p>CTO & Web Developer</p>
            </div>
            <div className="team-member-image">
              <img src="https://via.placeholder.com/400" alt="Donald Colin" />
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="team-member">
            <div className="team-member-image">
              <img src="https://via.placeholder.com/400" alt="Emily Brown" />
            </div>
            <div className="team-member-content">
              <h3>Emily Brown</h3>
              <p>CMO</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};