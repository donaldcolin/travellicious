import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
      handleNext();
    } else if (diff < -threshold) {
      handlePrevious();
    }
    
    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="relative mt-4 md:mt-6 group">
      <div
        className="aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100 cursor-pointer relative"
        onClick={onImageClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[activeIndex]}
          alt={`${productName} - Image ${activeIndex + 1}`}
          className="h-full w-full object-cover object-center transition-opacity duration-300"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
        
        {/* Mobile index indicator */}
        <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1 w-6 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Buttons - Always visible on mobile */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-opacity md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-gray-800" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-opacity md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-gray-800" />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageGallery;