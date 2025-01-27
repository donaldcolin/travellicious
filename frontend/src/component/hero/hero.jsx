import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from 'lucide-react';
import Trek from "../assets/trek.jpeg";
import mountaintrek from "../assets/mountaintrek.jpg"
import sunterk from "../assets/suntrek.jpg"

// Import all your images here
const images = [
mountaintrek, // Replace with your actual image paths
Trek,
 sunterk
];

export const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleScrollToTreks = () => {
    const heroHeight = document.querySelector('.hero').offsetHeight;
    window.scrollTo({
      top: heroHeight,
      behavior: "smooth"
    });
  };

  return (
    <div className="hero relative h-screen w-full flex justify-center items-center overflow-hidden">
      {/* Background Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Social Icons */}
      <div className="absolute bottom-4 md: bottom-6 right-4 md:right-6 flex gap-4 z-20">
        <a 
          href="https://www.instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-white-400 transition-colors duration-300"
        >
          <Instagram className="w-5 h-5 md:w-6 md:h-6 hover:scale-125 transition-transform duration-300" />
        </a>
        <a 
          href="https://www.facebook.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-white-400 transition-colors duration-300"
        >
          <Facebook className="w-5 h-5 md:w-6 md:h-6 hover:scale-125 transition-transform duration-300" />
        </a>
        <a 
          href="https://www.youtube.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-white-400 transition-colors duration-300"
        >
          <Youtube className="w-5 h-5 md:w-6 md:h-6 hover:scale-125 transition-transform duration-300" />
        </a>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-4 md:px-0 max-w-4xl mx-auto">
        <h1 className="font-ephesis text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 text-white">
          Welcome to Travellicious
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto">
          Discover amazing destinations and unforgettable experiences.
        </p>
        
        {/* Updated Buttons */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center">
          <button 
            onClick={handleScrollToTreks}
            className="w-48 md:w-auto bg-transparent text-white border-2 border-gray px-6 md:px-8 
                     py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold 
                     hover:bg-white/20 transform hover:scale-105 transition-all duration-300 
                     focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          >
            Explore Treks
          </button>
          <Link 
            to="/outings"
            className="w-48 md:w-auto"
          >
            <button className="w-full bg-transparent text-white border-2 border-white px-6 md:px-8 
                             py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold 
                             hover:bg-white/20 transform hover:scale-105 transition-all duration-300 
                             focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
              Explore Outings
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;