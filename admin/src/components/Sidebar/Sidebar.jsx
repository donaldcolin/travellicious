import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.jpeg';

const Sidebar = ({ onLogout }) => {
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

  return (
    <div className="w-[280px] h-screen bg-black text-white flex flex-col fixed left-0 top-0">
      {/* Sidebar Header with Logo and Brand */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img
            src={Logo}
            alt="Travellicious"
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-2xl font-semibold text-white m-0">Travellicious</h1>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-white/10">
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
        <button className="w-full py-3 px-3 bg-white/10 border-none rounded-md text-white cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:bg-white/20">
          <span className="text-xl">👤</span>
          <span>Profile</span>
        </button>
        <button 
          className="w-full py-3 px-3 bg-white text-black border-none rounded-md cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:bg-gray-200 mt-2"
          onClick={handleLogout}
        >
          <span className="text-xl">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;