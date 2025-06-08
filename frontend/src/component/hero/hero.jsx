import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// Define images with proper syntax and optimization parameters for Cloudinary
// Adding f_auto and q_auto parameters for automatic format and quality optimization
const images = [
  "https://res.cloudinary.com/dt9apeyvy/image/upload/f_auto,q_auto,w_1920/v1742245043/mountaintrek_qkcxyi.jpg",
  "https://res.cloudinary.com/dt9apeyvy/image/upload/f_auto,q_auto,w_1920/v1742244979/trek_wd6sls.jpg",
  "https://res.cloudinary.com/dt9apeyvy/image/upload/f_auto,q_auto,w_1920/v1742245041/suntrek_izdbup.jpg"
];

// Backup image in case Cloudinary fails
const fallbackImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80";

export const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Preload images with better error handling and timeout
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = images.length;
    
    // Set a timeout to prevent waiting forever if images are slow
    const timeoutId = setTimeout(() => {
      if (!imagesLoaded) {
        console.warn("Image loading timeout - using fallback");
        setLoadingError(true);
        setImagesLoaded(true);
        
        // Dispatch event to notify preloader even if we're using fallback
        const heroLoadedEvent = new Event('heroImagesLoaded');
        window.dispatchEvent(heroLoadedEvent);
      }
    }, 10000); // 10 second timeout
    
    const imagePromises = images.map((src, index) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
          loadedCount++;
          setLoadingProgress(Math.floor((loadedCount / totalImages) * 100));
          resolve();
        };
        
        img.onerror = () => {
          console.error(`Failed to load image: ${src}`);
          reject(new Error(`Failed to load image: ${src}`));
        };
        
        img.src = src;
      });
    });

    // Also preload fallback image
    const fallbackImg = new Image();
    fallbackImg.src = fallbackImage;

    Promise.all(imagePromises)
      .then(() => {
        clearTimeout(timeoutId);
        setImagesLoaded(true);
        setLoadingError(false);
        
        // Dispatch custom event to notify the preloader that hero images are loaded
        const heroLoadedEvent = new Event('heroImagesLoaded');
        window.dispatchEvent(heroLoadedEvent);
        
        console.log('Hero images loaded, event dispatched');
      })
      .catch(err => {
        console.error("Failed to preload images", err);
        setLoadingError(true);
        setImagesLoaded(true);
        
        // Still dispatch event so preloader can hide
        const heroLoadedEvent = new Event('heroImagesLoaded');
        window.dispatchEvent(heroLoadedEvent);
      });
      
    return () => clearTimeout(timeoutId);
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
                backgroundImage: loadingError 
                  ? `url(${fallbackImage})` 
                  : `url(${images[currentImageIndex]})`,
                // This ensures an image is always visible during transitions
                zIndex: currentImageIndex 
              }}
              role="img"
              aria-label="Hero Background"
            />
          </AnimatePresence>
        </div>
      )}

      {/* Loading indicator - shown when images are not loaded yet */}
      {!imagesLoaded && (
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-gray-900">
          <div className="w-12 h-12 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <div className="mt-4 text-white">{loadingProgress}% loaded</div>
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