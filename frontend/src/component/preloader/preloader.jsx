import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const LoaderWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  z-index: 9999;
`;

const LoaderContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Logo = styled(motion.div)`
  width: 120px;
  height: 120px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 3px solid #fff;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled(motion.p)`
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  max-width: 300px;
`;

const ProgressContainer = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.1) 100%
    );
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const Progress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  border-radius: 3px;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    animation: shine 1.5s infinite;
  }
  
  @keyframes shine {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const ProgressText = styled.span`
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
`;

const loadingMessages = [
  "Preparing your journey...",
  "Packing your virtual suitcase...",
  "Checking the weather...",
  "Mapping your destinations...",
  "Almost ready for takeoff...",
  "Loading your travel memories...",
  "Setting up your adventure...",
  "Connecting to travel guides...",
  "Preparing your itinerary...",
  "Loading travel tips..."
];

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(loadingMessages[0]);
  const [isVisible, setIsVisible] = useState(true);
  const [heroImagesLoaded, setHeroImagesLoaded] = useState(false);

  useEffect(() => {
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setMessage(loadingMessages[messageIndex]);
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Slower progress as we get closer to 100
        const increment = Math.max(0.1, (100 - prev) * 0.1);
        return Math.min(prev + increment, 100);
      });
    }, 50);

    // Listen for hero images loaded event
    const handleHeroImagesLoaded = () => {
      setHeroImagesLoaded(true);
    };

    window.addEventListener('heroImagesLoaded', handleHeroImagesLoaded);

    // Check if all critical resources are loaded
    const checkResourcesLoaded = () => {
      const images = Array.from(document.getElementsByTagName('img'));
      const stylesheets = Array.from(document.getElementsByTagName('link'))
        .filter(link => link.rel === 'stylesheet');
      
      const allResourcesLoaded = 
        images.every(img => img.complete) &&
        stylesheets.every(link => link.sheet !== null) &&
        heroImagesLoaded;

      if (allResourcesLoaded && progress >= 100) {
        clearInterval(progressInterval);
        clearInterval(messageInterval);
        
        // Add a small delay before hiding
        setTimeout(() => {
          setIsVisible(false);
        }, 500);
      }
    };

    // Check resources periodically
    const resourceCheckInterval = setInterval(checkResourcesLoaded, 100);

    // Also check on window load
    window.addEventListener('load', checkResourcesLoaded);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearInterval(resourceCheckInterval);
      window.removeEventListener('load', checkResourcesLoaded);
      window.removeEventListener('heroImagesLoaded', handleHeroImagesLoaded);
    };
  }, [progress, heroImagesLoaded]);

  return (
    <AnimatePresence>
      {isVisible && (
        <LoaderWrapper
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoaderContent>
            <Logo
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            <LoadingText
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {message}
            </LoadingText>

            <ProgressContainer>
              <ProgressBar>
                <Progress
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </ProgressBar>
              <ProgressText>{Math.round(progress)}%</ProgressText>
            </ProgressContainer>
          </LoaderContent>
        </LoaderWrapper>
      )}
    </AnimatePresence>
  );
};

export default Preloader;