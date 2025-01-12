import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Sidebar Header with Logo and Company Name */}
      <div className="sidebar-header">
        <img 
          src="/path-to-your-logo/logo.png" // Replace with the actual path to your logo
          alt="Company Logo" 
          className="sidebar-logo-img" 
        />
        <span className="sidebar-logo-text">Travellicious</span>
      </div>
      
      {/* Sidebar Menu */}
      <div className="sidebar-menu">
        <ul>
          <li>
            <Link to="/addproduct" className="sidebar-link">
              Add Product
            </Link>
          </li>
          <li>
            <Link to="/listproduct" className="sidebar-link">
              List All Products
            </Link>
          </li>
        </ul>
      </div>

      {/* Profile Button */}
      <div className="sidebar-profile">
        <button className="profile-btn">Profile</button>
      </div>
    </div>
  );
};

export default Sidebar;