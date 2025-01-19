import React from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';

 export const Footer = () => {
  const navigation = {
    main: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' },
      { name: 'Privacy', href: '#privacy' },
      { name: 'Terms', href: '#terms' },
    ],
    social: [
      { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/aldified' },
      { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
      { name: 'Youtube', icon: Youtube, href: 'https://youtube.com' },
    ],
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <img
              src="/api/placeholder/40/40"
              alt="Travellicious Logo"
              className="h-10 w-10 rounded-full border-2 border-blue-400 p-1"
            />
            <span className="text-xl font-bold ">
              Travellicious
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navigation.main.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm hover:text-blue-400 transition duration-300"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex space-x-4">
            {navigation.social.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-blue-400 transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Travellicious. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

