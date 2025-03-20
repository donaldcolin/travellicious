import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// Define images with proper syntax
const images = [
  "https://res.cloudinary.com/dt9apeyvy/image/upload/v1742245043/mountaintrek_qkcxyi.jpg",
  "https://res.cloudinary.com/dt9apeyvy/image/upload/v1742244979/trek_wd6sls.jpg",
  "https://res.cloudinary.com/dt9apeyvy/image/upload/v1742245041/suntrek_izdbup.jpg"
];

export const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images to avoid flashing
  useEffect(() => {
    const imagePromises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch(err => console.error("Failed to preload images", err));
  }, []);

  // Start the rotation only after images are loaded
  useEffect(() => {
    if (!imagesLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [imagesLoaded]);

  const handleScrollToTreks = () => {
    const heroHeight = document.querySelector('.hero').offsetHeight;
    window.scrollTo({
      top: heroHeight,
      behavior: "smooth"
    });
  };

  return (
    <div className="hero relative h-screen w-full flex justify-center items-center overflow-hidden bg-gray-900">
      {/* Background Images with improved AnimatePresence */}
      {imagesLoaded && (
        <div className="absolute inset-0 z-0">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1.5, 
                ease: "easeInOut",
                // Increase crossfade overlap
                exit: { duration: 1.5 } 
              }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${images[currentImageIndex]})`,
                // This ensures an image is always visible during transitions
                zIndex: currentImageIndex 
              }}
              role="img"
              aria-label="Hero Background"
            />
          </AnimatePresence>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Social Icons */}
      <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 flex gap-4 z-20">
        <a 
          href="https://www.instagram.com/aldified" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-white-400 transition-colors duration-300"
          aria-label="Instagram"
        >
          <Instagram className="w-5 h-5 md:w-6 md:h-6 hover:scale-125 transition-transform duration-300" />
        </a>
        <a 
          href="https://www.facebook.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-white-400 transition-colors duration-300"
          aria-label="Facebook"
        >
          <Facebook className="w-5 h-5 md:w-6 md:h-6 hover:scale-125 transition-transform duration-300" />
        </a>
        <a 
          href="https://www.youtube.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-white-400 transition-colors duration-300"
          aria-label="YouTube"
        >
          <Youtube className="w-5 h-5 md:w-6 md:h-6 hover:scale-125 transition-transform duration-300" />
        </a>
      </div>

      {/* Hero Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-20 text-center px-4 md:px-0 max-w-4xl mx-auto"
      >
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-ephesis text-4xl md:text-6xl lg:text-8xl font mb-4 md:mb-6 text-white"
        >
          Welcome to Travellicious
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto"
        >
          Discover amazing destinations and unforgettable experiences.
        </motion.p>
        
        {/* Updated Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center"
        >
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollToTreks}
            className="w-48 md:w-auto bg-transparent text-white border-2 border-white px-6 md:px-8 
                     py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold 
                     transition-all duration-300 focus:outline-none focus:ring-2 
                     focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label="Explore Treks"
          >
            Explore Treks
          </motion.button>
          <Link 
            to="/outings"
            className="w-48 md:w-auto"
          >
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-transparent text-white border-2 border-white px-6 md:px-8 
                           py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold 
                           transition-all duration-300 focus:outline-none focus:ring-2 
                           focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Explore Outings
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;