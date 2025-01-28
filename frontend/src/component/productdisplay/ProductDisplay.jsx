import React, { useState } from "react";
import { Button } from "../../components/ui/button.jsx";
import { Card } from "../../components/ui/card.tsx";
import { MapPin, Mountain, Clock, Footprints, Activity, CheckCircle2 ,  Calendar } from "lucide-react";
import ContactSideSheet from "./SideSheet.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

export const ProductDisplay = ({ product }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedImage, setSelectedImage] = useState(
    // Handle cases where image might be a single string or an array
    Array.isArray(product.images) 
      ? product.images[0] 
      : product.image || product.images
  );

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const today = new Date().toISOString().split("T")[0];

  // Ensure images is always an array
  const productImages = Array.isArray(product.images) 
    ? product.images 
    : [product.image || product.images].filter(Boolean);

    return (
      <div className="min-h-screen py-4 md:py-12 bg-gradient-to-b from-blue-50/20 to-green-50/20">
        {/* Mobile Image Gallery - Improved with nature-themed pagination */}
        <div className="md:hidden w-full bg-white shadow-lg rounded-xl mx-4 overflow-hidden">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-green-600 !opacity-50',
              bulletActiveClass: '!bg-green-800 !opacity-100'
            }}
            className="h-96 rounded-xl"
            style={{
              "--swiper-navigation-color": "#16a34a",
              "--swiper-pagination-bullet-size": "12px",
              "--swiper-pagination-bullet-horizontal-gap": "6px"
            }}
          >
            {productImages.map((image, index) => (
              <SwiperSlide key={index} className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
                <img
                  src={image}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
  
        <Card className="container max-w-8xl bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200/60">
          <div className="grid md:grid-cols-2 gap-8 p-4 md:p-8">
            {/* Left Column - Desktop */}
            <div className="hidden md:block space-y-8">
              {/* Main Image with Nature-inspired Frame */}
              <div className="rounded-2xl overflow-hidden border-4 border-white shadow-2xl relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 to-blue-100/20 pointer-events-none" />
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-[600px] object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-3 rounded-lg backdrop-blur-sm shadow-md">
                  <h2 className="text-xl font-bold text-gray-800">Exploring {product.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">{product.location}</p>
                </div>
              </div>
  
              {/* Thumbnail Gallery with Hover Effects */}
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((image, index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300 ${
                      image === selectedImage
                        ? "ring-3 ring-green-600 ring-offset-2"
                        : "hover:ring-2 hover:ring-green-400"
                    }`}
                    onClick={() => handleImageClick(image)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
                    <img
                      src={image}
                      alt={`Trek view ${index + 1}`}
                      className="w-full h-24 object-cover transform hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
  
              {/* Trek Overview - Enhanced Typography */}
              <div className="bg-green-50/30 p-6 rounded-2xl border border-green-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Mountain className="h-6 w-6 text-green-700" />
                  Trek Overview
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg font-medium">
                  {product.description}
                </p>
              </div>
            </div>
  
            {/* Right Column */}
            <div className="space-y-6">
              {/* Header Section with Price */}
              <div className="md:block">
                <div className="mb-4">
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {product.difficulty || "Moderate"} Trek
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl md:text-3xl font-bold text-green-700">
                ₹{product.price?.single || product.price}
              </span>
              <span className="text-gray-500 text-sm">per person</span>
            </div>
          </div>
  
          {/* Info Grid with Improved Card Design */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: MapPin, label: "Location", value: product.location, color: "text-green-600" },
              { icon: Mountain, label: "Altitude", value: product.altitude || "N/A", color: "text-blue-600" },
              { icon: Clock, label: "Duration", value: product.duration || "N/A", color: "text-amber-600" },
              { icon: Footprints, label: "Grade", value: product.difficulty || "N/A", color: "text-red-600" }
            ].map((item, index) => (
              <div key={index} className="bg-white p-3 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-opacity-20 ${item.color.replace('text', 'bg')}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          {/* Date Selection - Custom Styled */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm">
            <div className="mb-6">
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <h2 className="text-sm font-semibold text-green-800 uppercase tracking-wide mb-1">
                  Next Available Date
                </h2>
                <span className="text-xl font-bold text-green-700">
                  {product.nextdate || "Contact for dates"}
                </span>
              </div>
            </div>
  
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-3">Select Your Trek Date</h2>
              <div className="relative">
                <input
                  type="date"
                  min={today}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200
                           bg-white text-gray-900 font-medium cursor-pointer placeholder-gray-400
                           hover:border-green-300 transition-colors"
                />
                <Calendar className="absolute right-3 top-3 h-6 w-6 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
  
          {/* Key Attractions - Grid Layout */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              Key Attractions
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {(product.attractions || []).map((attraction, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-green-50/30 hover:bg-green-50/50 transition-colors">
                  <span className="flex-shrink-0 h-6 w-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 font-medium">{attraction}</span>
                </div>
              ))}
            </div>
          </div>
  
          {/* Included Services - Icon List */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Included Services
            </h2>
            <div className="space-y-3">
              {Object.entries(product.services || {}).map(([key, value]) => (
                <div key={key} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
  
          {/* Booking Button with Animation */}
          <ContactSideSheet>
            <Button 
              size="lg"
              className="w-full py-6 text-lg font-bold bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800
                       rounded-xl shadow-lg hover:shadow-green-200/50 transition-all duration-300 transform hover:scale-[1.02]"
              disabled={!selectedDate}
            >
              Book Your Adventure Now
            </Button>
          </ContactSideSheet>
        </div>
      </div>
    </Card>
  </div>
  );
  };