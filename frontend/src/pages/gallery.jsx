import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const SkeletonImage = ({ className }) => (
  <div className={`animate-pulse rounded-lg overflow-hidden ${className}`}>
    <div className="w-full h-full bg-gray-300"></div>
  </div>
);

// Progressive Image component for smooth loading
const ProgressiveImage = ({ src, alt, className, imageClassName = "", onLoad }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg" />
      )}
      
      {/* Actual image with opacity transition */}
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover rounded-lg ${imageClassName} ${
          !imageLoaded ? "opacity-0" : "opacity-100"
        }`}
        style={{ transition: "opacity 0.3s ease-in-out" }}
        onLoad={() => {
          setImageLoaded(true);
          if (onLoad) onLoad();
        }}
      />
    </div>
  );
};

export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const imagesResponse = await axios.get(`${API_BASE_URL}/gallery`);
        setImages(imagesResponse.data);
        
        setTimeout(() => {
          setLoading(false);
        }, 300);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || err.message || "Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Track progress of loaded images
  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };
  
  // Calculate loading percentage
  const loadingProgress = images.length > 0 
    ? Math.floor((imagesLoaded / images.length) * 100) 
    : 0;

  // Group images by category
  const groupedImages = images.reduce((acc, image) => {
    if (!acc[image.category]) {
      acc[image.category] = {
        images: [],
        description: image.categoryDescription
      };
    }
    acc[image.category].images.push(image);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="w-48 h-10 bg-gray-300 animate-pulse mx-auto mb-8 rounded-md"></div>
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              <div className="w-32 h-8 bg-gray-300 animate-pulse mb-4 rounded-md"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, imgIndex) => (
                  <div key={imgIndex} className="aspect-video">
                    <SkeletonImage className="w-full h-full" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 text-lg font-semibold mb-2">Error Loading Gallery</h2>
          <p className="text-red-600">{error}</p>
          <p className="text-sm text-red-500 mt-2">
            Please check if the backend server is running and the API endpoints are correct.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-8 mt-16"
    >
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900"
      >
        Our Gallery
      </motion.h1>
      
      {/* Loading progress indicator */}
      {!loading && images.length > 0 && imagesLoaded < images.length && (
        <div className="fixed bottom-4 right-4 bg-white p-2 rounded-md shadow-md z-50">
          <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-center mt-1">{loadingProgress}% loaded</p>
        </div>
      )}
      
      {images.length === 0 && !loading ? (
        <p className="text-center text-gray-500">No images found</p>
      ) : (
        <div className="space-y-12">
          {Object.entries(groupedImages).map(([category, { images: categoryImages, description }]) => (
            <motion.div
              key={category}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{category}</h2>
                <p className="text-gray-600 mt-2">{description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryImages.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden border-0 hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-0">
                        <ProgressiveImage
                          src={item.imageUrl}
                          alt={category}
                          className="w-full aspect-video"
                          imageClassName="transition-transform duration-300 group-hover:scale-103"
                          onLoad={handleImageLoad}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Gallery;