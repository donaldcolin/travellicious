import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { ZoomIn, ZoomOut, X, RotateCw, Maximize, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';

const ImageModal = ({ 
  isOpen, 
  onClose, 
  images, 
  productName, 
  activeIndex, 
  setActiveIndex,
  zoomLevel = 1,
  setZoomLevel,
  swiper,
  setSwiper 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setZoomLevel(1);
      setRotation(0);
      setIsLoading(true);
    }
  }, [isOpen, setZoomLevel]);

  const handleZoom = (direction) => {
    setZoomLevel(prev => {
      if (direction === 'in' && prev < 3) return prev + 0.5;
      if (direction === 'out' && prev > 1) return prev - 0.5;
      return prev;
    });
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullscreen(false);
      }
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog 
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          open={isOpen} 
          onClose={() => {
            onClose();
            setZoomLevel(1);
          }} 
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <Dialog.Overlay 
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/95" 
          />

          {/* Controls toolbar */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 left-0 right-0 z-20 flex justify-center"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full">
              <button 
                onClick={() => handleZoom('out')} 
                className="p-2 rounded-full text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-white" 
                aria-label="Zoom out"
                disabled={zoomLevel <= 1}
              >
                <ZoomOut size={20} className={zoomLevel <= 1 ? 'opacity-50' : ''} />
              </button>
              
              <div className="text-white text-xs font-mono bg-black/30 px-2 py-1 rounded">
                {Math.round(zoomLevel * 100)}%
              </div>
              
              <button 
                onClick={() => handleZoom('in')} 
                className="p-2 rounded-full text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-white" 
                aria-label="Zoom in"
                disabled={zoomLevel >= 3}
              >
                <ZoomIn size={20} className={zoomLevel >= 3 ? 'opacity-50' : ''} />
              </button>
              
              <div className="w-px h-6 bg-white/20 mx-1"></div>
              
              <button 
                onClick={handleRotate} 
                className="p-2 rounded-full text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-white" 
                aria-label="Rotate image"
              >
                <RotateCw size={20} />
              </button>
              
              <button 
                onClick={toggleFullscreen} 
                className="p-2 rounded-full text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-white" 
                aria-label="Toggle fullscreen"
              >
                <Maximize size={20} />
              </button>
              
              <div className="w-px h-6 bg-white/20 mx-1"></div>
              
              <button 
                onClick={() => {
                  onClose();
                  setZoomLevel(1);
                }} 
                className="p-2 rounded-full text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-white" 
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-white bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
            {activeIndex + 1} / {images.length}
          </div>

          <div className="relative w-full h-full">
            <div className="relative h-full group">
              <Swiper
                modules={[Navigation, Pagination, Keyboard]}
                spaceBetween={0}
                slidesPerView={1}
                initialSlide={activeIndex}
                navigation={false} // We'll use custom navigation
                pagination={{ 
                  clickable: true,
                  dynamicBullets: true, 
                  bulletClass: 'swiper-pagination-bullet !bg-white !opacity-50',
                  bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !opacity-100'
                }}
                keyboard={{
                  enabled: true,
                  onlyInViewport: true,
                }}
                className="h-full w-full"
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                onSwiper={setSwiper}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index} className="flex items-center justify-center">
                    {isLoading && activeIndex === index && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <motion.div 
                      className="w-full h-full flex items-center justify-center overflow-hidden"
                      style={{ 
                        cursor: zoomLevel > 1 ? 'move' : 'default',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isLoading && activeIndex === index ? 0.5 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img 
                        src={image} 
                        className="max-h-screen w-auto transition-all duration-300 ease-out"
                        style={{ 
                          transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                          objectFit: 'contain'
                        }}
                        alt={`${productName} view ${index + 1}`}
                        onLoad={handleImageLoad}
                      />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Custom navigation buttons */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={() => swiper?.slidePrev()} 
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-white z-20"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={() => swiper?.slideNext()} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-white z-20"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;