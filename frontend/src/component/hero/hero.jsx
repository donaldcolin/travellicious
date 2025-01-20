import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from 'lucide-react';
import Trek from "/Users/donaldcolin/travelicious/frontend/src/component/assets/trek.jpeg";


export const Hero = () => {
  const handleScrollToTreks = () => {
    const heroHeight = document.querySelector('.hero').offsetHeight;
    window.scrollTo({
      top: heroHeight,
      behavior: "smooth"
    });
  };

  return (
    <div className="hero relative h-screen w-full flex justify-center items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-[20s] ease-in-out hover:scale-110"
        style={{ backgroundImage: `url(${Trek})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Social Icons */}
      <div className="absolute top-4 md:top-6 right-4 md:right-6 flex gap-4 z-20">
        <a 
          href="https://www.instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-yellow-400 transition-colors duration-300"
        >
          <Instagram className="w-5 h-5 md:w-6 md:h-6 hover:scale-125 transition-transform duration-300" />
        </a>
        <a 
          href="https://www.facebook.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-yellow-400 transition-colors duration-300"
        >
          <Facebook className="w-5 h-5 md:w-6 md:h-6 hover:scale-125 transition-transform duration-300" />
        </a>
        <a 
          href="https://www.youtube.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-yellow-400 transition-colors duration-300"
        >
          <Youtube className="w-5 h-5 md:w-6 md:h-6 hover:scale-125 transition-transform duration-300" />
        </a>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-4 md:px-0 max-w-4xl mx-auto">
        <h1 className="font-ephesis text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-white">
          Welcome to Travellicious
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto">
          Discover amazing destinations and unforgettable experiences.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center">
          <button 
            onClick={handleScrollToTreks}
            className="w-48 md:w-auto bg-yellow-400 text-blue-900 px-6 md:px-8 py-2.5 md:py-3 rounded-lg 
                     text-sm md:text-base font-semibold hover:bg-yellow-500 transform hover:scale-105 
                     transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 
                     focus:ring-offset-2"
          >
            Explore Treks
          </button>
          <Link 
            to="/outings"
            className="w-48 md:w-auto"
          >
            <button className="w-full bg-yellow-400 text-blue-900 px-6 md:px-8 py-2.5 md:py-3 rounded-lg 
                             text-sm md:text-base font-semibold hover:bg-yellow-500 transform hover:scale-105 
                             transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 
                             focus:ring-offset-2">
              Explore Outings
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;