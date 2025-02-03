import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageGallery = ({ 
  images, 
  productName, 
  onImageClick, 
  activeIndex, 
  setActiveIndex 
}) => {
  const handlePrevious = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative mt-16 md:mt-20 group">
      <div 
        className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
        onClick={onImageClick}
      >
        <img
          src={images[activeIndex]}
          alt={`${productName} - Image ${activeIndex + 1}`}
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-opacity opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-opacity opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>
        </>
      )}

      {/* Thumbnail Navigation */}
      

    </div>
  );
};

export default ImageGallery;