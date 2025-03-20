import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { motion, AnimatePresence } from 'framer-motion';

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const LoaderWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
`;

const Loader = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border-top: 3px solid #fff;
  border-right: 3px solid transparent;
  animation: ${rotation} 1s linear infinite;
`;

const BrandName = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #ddd;
  margin-top: 1rem;
`;

const LoadingText = styled.div`
  color: #aaa;
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  margin-top: 1rem;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: #fff;
  border-radius: 2px;
  transition: width 0.3s ease;
  width: ${props => props.width}%;
`;

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Preparing your journey...");

  // Track loading progress
  useEffect(() => {
    // Start with some progress to show activity
    setProgress(10);
    
    // Array of loading messages to cycle through
    const messages = [
      "Preparing your journey...",
      "Packing your virtual suitcase...",
      "Checking the weather...",
      "Mapping your destinations...",
      "Almost ready for takeoff..."
    ];
    
    // Change message every 2 seconds
    const messageInterval = setInterval(() => {
      setLoadingMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 2000);
    
    // Simulate progress until window load completes
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        // Slowly increase up to 90% before window load completes
        const increment = Math.random() * 5;
        return Math.min(prev + increment, 90);
      });
    }, 300);
    
    // Event listeners for asset loading
    const handleLoad = () => {
      clearInterval(progressInterval);
      setProgress(100);
      
      // Delay hiding the preloader to ensure smooth transition
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    
    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }
    
    // Add listener for images and other resources
    const resourcesLoaded = () => {
      const resources = Array.from(document.images);
      const loadedResources = resources.filter(img => img.complete).length;
      const totalResources = resources.length;
      
      if (totalResources > 0) {
        const resourceProgress = (loadedResources / totalResources) * 50;
        setProgress(prev => Math.max(prev, 40 + resourceProgress));
      }
    };
    
    // Check resources periodically
    const resourceInterval = setInterval(resourcesLoaded, 200);
    
    return () => {
      window.removeEventListener('load', handleLoad);
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearInterval(resourceInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <LoaderWrapper
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              {/* Main spinning loader */}
              <Loader />
              
              {/* Centered plane icon */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
         
              </motion.div>
            </div>
            
            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <BrandName>
                Travellicious
              </BrandName>
            </motion.div>
            
            {/* Loading progress */}
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <ProgressBar>
                <ProgressFill width={progress} />
              </ProgressBar>
              <LoadingText>{loadingMessage}</LoadingText>
            </motion.div>
          </div>
        </LoaderWrapper>
      )}
    </AnimatePresence>
  );
};

export default Preloader;