import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.jpeg';

export const Navbar = () => {
  const location = useLocation(); // Get the current location
  const [menu, setMenu] = useState("home"); // Default selected menu item

  // Update the menu state based on the current route
  useEffect(() => {
    const path = location.pathname.substring(1);
    setMenu(path || "home"); // Default to "home" if path is empty
  }, [location]);

  return (
    <div className="navbar">
      {/* Logo Section */}
      <div className="nav-logo">
        <img src={logo} alt="Logo" className="logo-image" />
        <p className="logo-text">Travellicious</p>
      </div>

      {/* Navigation Menu */}
      <ul className="nav-menu">
        <li className={menu === "home" ? "active" : ""}>
          <Link to="/home">Home</Link>
        </li>
        <li className={menu === "outings" ? "active" : ""}>
          <Link to="/outings">Outings</Link>
        </li>
        <li className={menu === "gallery" ? "active" : ""}>
          <Link to="/gallery">Gallery</Link>
        </li>
        <li className={menu === "aboutus" ? "active" : ""}>
          <Link to="/aboutus">About Us</Link>
        </li>
        <li className={menu === "contactus" ? "active" : ""}>
          <Link to="/contactus">Contact Us</Link>
        </li>
      </ul>

      {/* Login/Cart Buttons */}
      <div className="nav-buttons">
        <button className="nav-button">Login</button>
        <button className="nav-button">Cart</button>
      </div>
    </div>
  );
};