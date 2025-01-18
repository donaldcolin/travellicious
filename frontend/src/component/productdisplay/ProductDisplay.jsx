import React, { useState } from "react";
import { Button } from "../../components/ui/button.jsx";
import { Card } from "../../components/ui/card.tsx";
import { MapPin, Mountain, Clock, Footprints, Activity, CheckCircle2 } from "lucide-react";
import ContactSideSheet from "./SideSheet.jsx";

export const ProductDisplay = ({ product }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen py-12">
      <Card className="container  max-h-8xl bg-white rounded-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Left side content */}
          <div className="space-y-8">
            {/* Main Image */}
            <div className="rounded-xl overflow-hidden border border-gray-200 ">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer rounded-lg overflow-hidden shadow-md transition-all transform hover:scale-105 ${
                    image === selectedImage
                      ? "ring-2 ring-blue-500 ring-offset-1"
                      : "hover:ring-2 hover:ring-blue-300 hover:ring-offset-1"
                  }`}
                  onClick={() => handleImageClick(image)}
                >
                  <img
                    src={image}
                    alt={`Trek view ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Trek Overview */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Trek Overview</h2>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            Trek Highlights
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Trek Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.highlights?.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-1" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side content */}
          <div className="space-y-6">
            {/* Price section */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h1 className="text-4xl font-bold text-black-900 mb-4">{product.name}</h1>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-gray-60">₹{product.price?.single}</span>
                <span className="text-gray-600"></span>
              </div>
            </div>

            {/* Trek Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: MapPin, label: "Location", value: product.location },
                { icon: Mountain, label: "Altitude", value: product.altitude },
                { icon: Clock, label: "Duration", value: product.duration },
                { icon: Footprints, label: "Difficulty", value: product.difficulty }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl flex items-start gap-3">
                  <item.icon className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="font-medium text-gray-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Next Available Date */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h2 className="text-lg text-gray-700 mb-2">Next Available Date:</h2>
                <span className="text-xl font-bold text-blue-600">{product.nextdate}</span>
              </div>

              {/* Date Selection */}
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Trek Date</h2>
              <input
                type="date"
                min={today}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         bg-white text-gray-900 text-lg cursor-pointer hover:border-blue-400 transition-colors"
              />
            </div>

            {/* Key Attractions */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Attractions</h2>
              <div className="space-y-3">
                {product.attractions?.map((attraction, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">{attraction}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Included Services */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Services Included</h2>
              <div className="space-y-3">
                {Object.entries(product.services || {}).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3 bg-white p-3 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Button */}
            <ContactSideSheet>
              <Button 
                size="lg"
                className="w-full py-6 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"
                disabled={!selectedDate}
              >
                Book Trek Now
              </Button>
            </ContactSideSheet>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDisplay;