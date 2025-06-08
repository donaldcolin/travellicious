import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.jpeg';

const Sidebar = ({ onLogout, user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Call the logout function passed from parent
    if (onLogout) {
      onLogout();
    } else {
      // Fallback logout if no function is provided
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      window.location.href = '/admin/login';
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Toggle Button - Only visible on small screens */}
      <div className="fixed top-4 left-4 z-50 block md:hidden">
        <button 
          onClick={toggleMobileMenu}
          className="p-2 bg-black rounded-md text-white"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Sidebar - Full on desktop, off-canvas on mobile */}
      <div className={`w-[280px] h-screen bg-black text-white flex flex-col fixed left-0 top-0 z-40 
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Sidebar Header with Logo and Brand */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt="Travellicious"
              className="w-10 h-10 object-contain rounded-md"
            />
            <h1 className="text-2xl font-semibold text-white m-0">Travellicious</h1>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-5 overflow-y-auto">
          <ul className="list-none p-0 m-0">
            <li className="my-1">
              <Link to="/addproduct" className="flex items-center px-6 py-3 text-white no-underline transition-all duration-300 ease-in-out gap-3 hover:bg-white/10">
                <span className="text-xl w-6 text-center">🏔️</span>
                <span>Add Treks</span>
              </Link>
            </li>
            <li className="my-1">
              <Link to="/listproduct" className="flex items-center px-6 py-3 text-white no-underline transition-all duration-300 ease-in-out gap-3 hover:bg-white/10">
                <span className="text-xl w-6 text-center">🗺️</span>
                <span>List of Treks</span>
              </Link>
            </li>
            <li className="my-1">
              <Link to="/addouting" className="flex items-center px-6 py-3 text-white no-underline transition-all duration-300 ease-in-out gap-3 hover:bg-white/10">
                <span className="text-xl w-6 text-center">🎉</span>
                <span>Add Outing</span>
              </Link>
            </li>
            <li className="my-1">
              <Link to="/listouting" className="flex items-center px-6 py-3 text-white no-underline transition-all duration-300 ease-in-out gap-3 hover:bg-white/10">
                <span className="text-xl w-6 text-center">📅</span>
                <span>List of Outings</span>
              </Link>
            </li>
            <li className="my-1">
              <Link to="/contact" className="flex items-center px-6 py-3 text-white no-underline transition-all duration-300 ease-in-out gap-3 hover:bg-white/10">
                <span className="text-xl w-6 text-center">✉️</span>
                <span>Contacted Us</span>
              </Link>
            </li>
            <li className="my-1">
              <Link to="/buy" className="flex items-center px-6 py-3 text-white no-underline transition-all duration-300 ease-in-out gap-3 hover:bg-white/10">
                <span className="text-xl w-6 text-center">🎫</span>
                <span>Bought</span>
              </Link>
            </li>
            <li className="my-1">
              <Link to="/growth" className="flex items-center px-6 py-3 text-white no-underline transition-all duration-300 ease-in-out gap-3 hover:bg-white/10">
                <span className="text-xl w-6 text-center">📈</span>
                <span>Reach</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Profile Section */}
        <div className="p-5 border-t border-white/10">
          {user && (
            <div className="mb-3 py-2 px-3 bg-white/5 rounded-md">
              <p className="text-sm text-white/80 m-0">Logged in as:</p>
              <p className="font-medium text-white m-0">{user.name || user.email}</p>
            </div>
          )}
          <button 
            className="w-full py-3 px-3 bg-white text-black border-none rounded-md cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:bg-gray-200 mt-2"
            onClick={handleLogout}
          >
            <span className="text-xl">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile - only visible when menu is open */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default Sidebar;