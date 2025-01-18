import React from 'react';
import './footer.css';
import logo from '../assets/logo.jpeg';
import Insta from '../assets/insta.jpeg'

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-header">
        <img src={logo} alt="logo" className="footer-logo" />
        <p className="footer-title">Travellicious</p>
      </div>
      <ul className="footer-links">
        <li><a href="#register">Register</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#careers">Careers</a></li>
        <li><a href="#contact">Contact Us</a></li>
      </ul>
      <div className="footer-social-icons">
        <a href="https://instagram.com/aldified" rel="noopener noreferrer">
          <img src="/path-to-instagram-icon.png"  />
        </a>
        <a href="https://facebook.com"  rel="noopener noreferrer">
          <img src="/path-to-facebook-icon.png"  />
        </a>
        <a href="https://youtube.com"  rel="noopener noreferrer">
          <img src="/path-to-youtube-icon.png"  />
        </a>
      </div>
      <div className="footer-copyright">
        <p>&copy; 2025 Travellicious. All rights reserved.</p>
      </div>
    </div>
  );
};