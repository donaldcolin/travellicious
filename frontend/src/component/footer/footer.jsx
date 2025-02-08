import React from 'react';
import { Instagram, Facebook, Youtube, Mail, Phone } from 'lucide-react';
import logo from '../assets/logo.jpeg';

export const Footer = () => {
  const navigation = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Blog', href: '#blog' },
    ],
    support: [
      { name: 'Contact', href: '#contact' },
      { name: 'FAQs', href: '#faq' },
      { name: 'Terms', href: '#terms' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'Accessibility', href: '#accessibility' },
    ],
    social: [
      { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/aldified' },
      { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
      { name: 'Youtube', icon: Youtube, href: 'https://youtube.com' },
    ],
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Newsletter Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt="Travellicious Logo"
                className="h-12 w-12 rounded-full"
              />
              <span className="text-2xl font-bold">Travellicious</span>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Join Our Newsletter</h3>
              <p className="text-sm text-gray-400">
                Get exclusive travel deals and updates straight to your inbox
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <nav className="space-y-2">
              {navigation.company.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-sm text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <nav className="space-y-2">
              {navigation.support.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-sm text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  <span>hello@travellicious.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="flex space-x-4">
                {navigation.social.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="h-6 w-6" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Travellicious. All rights reserved.</p>
            <nav className="flex flex-wrap justify-center gap-4">
              {navigation.legal.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="hover:text-blue-400 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};