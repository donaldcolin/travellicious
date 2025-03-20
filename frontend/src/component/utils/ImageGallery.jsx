import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ImageGallery = ({
  images,
  productName,
  onImageClick,
  activeIndex,
  setActiveIndex
}) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handlePrevious = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Swipe handlers for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const diff = touchStart - touchEnd;
    const threshold = 50; // Minimum swipe distance
    
    if (diff > threshold) {
      handleNext({ stopPropagation: () => {} });
    } else if (diff < -threshold) {
      handlePrevious({ stopPropagation: () => {} });
    }
    
    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="relative mt-4 md:mt-6 group">
      <div
        className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100 cursor-pointer relative"
        onClick={onImageClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.img
          key={activeIndex}
          src={images[activeIndex]}
          alt={`${productName} - Image ${activeIndex + 1}`}
          className="h-full w-full object-cover object-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
        />
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        
        {/* Product Name Overlay */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-10 w-full px-4">
          <h2 className="text-lg md:text-5xl font-bold text-white">
            {productName}
          </h2>
        </div>

        {/* Simple index indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1 ${
                index === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'
              } rounded-full transition-all duration-300`}
            />
          ))}
        </div>
      </div>

      {/* Minimal navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center z-10"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageGallery;