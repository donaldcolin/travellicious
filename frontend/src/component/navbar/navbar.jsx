import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, LogIn,PersonStanding } from 'lucide-react';


export const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menu, setMenu] = useState("home");

  useEffect(() => {
    const path = location.pathname.substring(1);
    setMenu(path || "home");
  }, [location]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: '/home', label: 'Home' },
    { path: '/outings', label: 'Outings' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/aboutus', label: 'About Us' },
    { path: '/contactus', label: 'Contact Us' },
  ];

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-blue-900 to-blue-700 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link to="/home" className="flex items-center space-x-3 flex-shrink-0">
            <img
              src=""
              alt="Logo"
              className="h-10 w-10 rounded-full border-2 border-blue-400"
            />
            <span className="text-2xl font-bold text-white hover:text-blue-200 transition duration-300">
              Travellicious
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-36">
            <div className="flex space-x-16">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-l font-medium transition duration-300 relative py-2 ${
                    menu === item.path.substring(1)
                      ? 'text-blue-200'
                      : 'text-gray-100 hover:text-white-200'
                  }`}
                >
                  {item.label}
                  {menu === item.path.substring(1) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400" />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Buttons */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 px-4 py-2 text-sm text-white hover:text-blue-200 transition duration-300">
                <PersonStanding className="h-4 w-4" />
              </button>
              <button className="flex items-center space-x-1 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                <ShoppingCart className="h-4 w-4" />
          
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-100 hover:text-blue-200 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-800">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                  menu === item.path.substring(1)
                    ? 'text-blue-200 bg-blue-900'
                    : 'text-gray-100 hover:bg-blue-700 hover:text-blue-200'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 px-3 py-2">
              <button className="flex items-center space-x-2 px-4 py-2 text-sm text-white hover:bg-blue-700 rounded-md transition duration-300">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;