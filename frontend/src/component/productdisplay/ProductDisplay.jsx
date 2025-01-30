import React, { useState } from "react";
import { Button } from "../../components/ui/button.jsx";
import { Card } from "../../components/ui/card.tsx";
import { MapPin, Mountain, Clock, Footprints, CheckCircle2, Calendar } from "lucide-react";
import ContactSideSheet from "./SideSheet.jsx";
import ImageGallery from "../utils/ImageGallery.jsx";
import ImageModal from '../utils/ImageModal.jsx';
import DateFormatter from "../utils/DateFormatter.jsx";

export const ProductDisplay = ({ product }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);
  const today = new Date().toISOString().split("T")[0];

  const productImages = Array.isArray(product.images) 
    ? product.images 
    : [product.image || product.images].filter(Boolean);

  return (
    <div className="min-h-screen pt-8 pb-8 md:py-12 bg-white">
      <ImageModal 
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        images={productImages}
        productName={product.name}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        swiper={swiper}
        setSwiper={setSwiper}
      />
      
      <Card className="container max-w-8xl mx-auto bg-transparent border-0 shadow-none">
        <div className="grid md:grid-cols-2 gap-8 px-8 md:px-8">
          {/* Left Column */}
          <div className="space-y-8">
            <ImageGallery 
              images={productImages}
              productName={product.name}
              onImageClick={() => setIsFullscreen(true)}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              swiper={swiper}
              setSwiper={setSwiper}
            />

            {/* Trek Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Mountain className="h-5 w-5 text-gray-600" />
              Overview
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Header Section */}
            <div className="pb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-gray-900">
                  ₹{typeof product.price === 'object' ? product.price.single : product.price}
                </span>
                <span className="text-gray-500">per person</span>
              </div>
            </div>

            {/* Key Info Grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: MapPin, label: "Location", value: product.location },
                { icon: Mountain, label: "Altitude", value: product.altitude || "N/A" },
                { icon: Clock, label: "Duration", value: product.duration || "N/A" },
                { icon: Footprints, label: "Grade", value: product.difficulty || "N/A" }
              ].map((item, index) => (
                <div key={index} className="p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">{item.label}</p>
                      <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Date Picker */}
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  min={today}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500 bg-white"
                />
                <Calendar className="absolute right-3 top-9 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Services & Attractions */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Included Services</h3>
                <div className="space-y-2">
                  {Object.entries(product.services || {}).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Key Attractions</h3>
                <div className="grid grid-cols-1 gap-2">
                  {(product.attractions || []).map((attraction, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-gray-600">▸</span>
                      <span className="text-gray-700">{attraction}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Button */}
            <ContactSideSheet>
              <Button 
                size="lg"
                className="w-full py-4 bg-gray-900 text-white hover:bg-gray-800 rounded-lg font-medium"
                disabled={!selectedDate}
              >
                Book Now
              </Button>
            </ContactSideSheet>

            {/* FAQs */}
            <div className="pt-6 border-t border-gray-200">
              <doubts />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDisplay;