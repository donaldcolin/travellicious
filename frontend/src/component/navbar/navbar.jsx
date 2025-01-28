import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import logobg from '../assets/logobg.png';

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
    <nav className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="bg-black/20 backdrop-blur-md rounded-2xl border border-white/10">
        <div className="mx-auto px-3 flex items-center justify-between h-12">
          {/* Logo Section - Reduced spacing */}
          <Link to="/home" className="flex items-center space-x-1">
            <img
              src={logobg}
              alt="Logo"
              className="h-20 w-10"
            />
            <span className="text-base font-bold text-white/90 hover:text-white transition duration-300">
              Travellicious
            </span>
          </Link>

          {/* Desktop Navigation - Reduced spacing */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex items-center space-x-10">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative text-sm font-medium transition-all duration-300 ${
                    menu === item.path.substring(1)
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 ${
                    menu === item.path.substring(1) ? 'w-full' : 'w-0 hover:w-full'
                  }`} />
                </Link>
              ))}
            </div>
          </div>

          {/* Action Buttons - Reduced spacing */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-white/70 hover:text-white transition duration-300">
              <User className="h-4 w-4" />
            </button>
            <button className="text-white/70 hover:text-white transition duration-300">
              <ShoppingBag className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white/70 hover:text-white transition duration-300"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Increased blur effect */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-black/40 backdrop-blur-xl rounded-xl">
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`block text-sm font-medium transition duration-300 ${
                    menu === item.path.substring(1)
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center space-x-4 pt-2">
                <button className="text-white/70 hover:text-white transition duration-300">
                  <User className="h-4 w-4" />
                </button>
                <button className="text-white/70 hover:text-white transition duration-300">
                  <ShoppingBag className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;