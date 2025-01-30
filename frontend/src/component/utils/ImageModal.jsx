import React from 'react';
import { Dialog } from '@headlessui/react';
import { ZoomIn, ZoomOut, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import CustomNavButton from './CustomNavButton';

const ImageModal = ({ 
  isOpen, 
  onClose, 
  images, 
  productName, 
  activeIndex, 
  setActiveIndex,
  zoomLevel,
  setZoomLevel,
  swiper,
  setSwiper 
}) => {
  const handleZoom = (direction) => {
    setZoomLevel(prev => {
      if (direction === 'in' && prev < 3) return prev + 0.5;
      if (direction === 'out' && prev > 1) return prev - 0.5;
      return prev;
    });
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={() => {
        onClose();
        setZoomLevel(1);
      }} 
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
    >
      <div className="relative w-full h-full">
        <div className="absolute top-4 right-4 flex gap-2 z-20">
          <button 
            onClick={() => handleZoom('in')} 
            className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20"
          >
            <ZoomIn size={24} />
          </button>
          <button 
            onClick={() => handleZoom('out')} 
            className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20"
          >
            <ZoomOut size={24} />
          </button>
          <button 
            onClick={() => {
              onClose();
              setZoomLevel(1);
            }} 
            className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20"
          >
            <X size={24} />
          </button>
        </div>
        <div className="relative h-full">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            initialSlide={activeIndex}
            navigation
            pagination={{ clickable: true }}
            className="h-full w-full"
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            onSwiper={setSwiper}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center">
                <div 
                  className="w-full h-full flex items-center justify-center overflow-hidden"
                  style={{ cursor: zoomLevel > 1 ? 'move' : 'default' }}
                >
                  <img 
                    src={image} 
                    className="max-h-screen w-auto transition-transform duration-200"
                    style={{ 
                      transform: `scale(${zoomLevel})`,
                      objectFit: 'contain'
                    }}
                    alt={`${productName} view ${index + 1}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <CustomNavButton 
            direction="prev" 
            onClick={() => swiper?.slidePrev()} 
            className="lg:opacity-0 lg:group-hover:opacity-100" 
          />
          <CustomNavButton 
            direction="next" 
            onClick={() => swiper?.slideNext()} 
            className="lg:opacity-0 lg:group-hover:opacity-100" 
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ImageModal;