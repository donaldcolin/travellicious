import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Sidebar Header with Logo and Brand */}
      <div className="sidebar-header">
        <div className="brand-container">
          <img 
            src="/logo.png" 
            alt="Travellicious" 
            className="brand-logo"
          />
          <h1 className="brand-name">Travellicious</h1>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/addproduct" className="nav-link">
              <i className="nav-icon">➕</i>
              <span>Add Product</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/listproduct" className="nav-link">
              <i className="nav-icon">📋</i>
              <span>List of Products</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              <i className="nav-icon">📞</i>
              <span>Contacted Us</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/buy" className="nav-link">
              <i className="nav-icon">🛍️</i>
              <span>Bought</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Profile Section */}
      <div className="sidebar-footer">
        <button className="profile-button">
          <i className="profile-icon">👤</i>
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;