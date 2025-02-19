import React, { useState } from 'react';
import { Instagram, Facebook, Youtube, ArrowRight } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState('');

  const navigation = {
    products: [
      { name: 'Treks' },
      { name: 'Outings', href: '/outings' },

    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Blog', href: '#blog' },
    ],
    support: [
      { name: 'Contact', href: '/contactus' },
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
    ]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <footer className="bg-black text-white py-24">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Newsletter Section */}
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-light mb-8">Stay Updated</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent border-b border-gray-700 py-2 pl-2 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:text-gray-300 transition-colors"
                >
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Subscribe to our newsletter for updates and news.
              </p>
            </form>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {/* Products Section */}
              <div>
               
                <h3 className="mb-6 text-gray-500 text-sm">Products</h3>
                <nav className="space-y-4">
                  {navigation.products.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="group block text-lg relative"
                      onMouseEnter={() => setIsHovered(item.name)}
                      onMouseLeave={() => setIsHovered('')}
                    >
                      <span className="relative z-10 transition-transform duration-300 inline-block group-hover:-translate-y-1">
                        {item.name}
                      </span>
                      <span
                        className={`absolute left-0 bottom-0 w-full h-[1px] bg-white transform origin-left transition-transform duration-300 ${
                          isHovered === item.name ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </a>
                  ))}
                </nav>
              </div>

              {/* Company Section */}
              <div>
             
                <h3 className="mb-6 text-gray-500 text-sm">Company</h3>
                <nav className="space-y-4">
                  {navigation.company.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="group block text-lg relative"
                      onMouseEnter={() => setIsHovered(item.name)}
                      onMouseLeave={() => setIsHovered('')}
                    >
                      <span className="relative z-10 transition-transform duration-300 inline-block group-hover:-translate-y-1">
                        {item.name}
                      </span>
                      <span
                        className={`absolute left-0 bottom-0 w-full h-[1px] bg-white transform origin-left transition-transform duration-300 ${
                          isHovered === item.name ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </a>
                  ))}
                </nav>
              </div>

              {/* Support Section */}
              <div>
    
                <h3 className="mb-6 text-gray-500 text-sm">Support</h3>
                <nav className="space-y-4">
                  {navigation.support.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="group block text-lg relative"
                      onMouseEnter={() => setIsHovered(item.name)}
                      onMouseLeave={() => setIsHovered('')}
                    >
                      <span className="relative z-10 transition-transform duration-300 inline-block group-hover:-translate-y-1">
                        {item.name}
                      </span>
                      <span
                        className={`absolute left-0 bottom-0 w-full h-[1px] bg-white transform origin-left transition-transform duration-300 ${
                          isHovered === item.name ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Logo, Social and Legal */}
        <div className="flex flex-col md:flex-row justify-between items-start pt-12 border-t border-gray-800">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-light mb-4">Travellicious</h2>
          
             
            <div className="flex space-x-6">
              {navigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-500 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-8 text-sm text-gray-500">
            {navigation.legal.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;