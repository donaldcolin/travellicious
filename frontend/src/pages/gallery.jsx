import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
    const fetchAllImages = async () => {
      try {
        // Fetch from all three sources
        const [productsResponse, outingsResponse, galleryResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/allproducts`),
          axios.get(`${API_BASE_URL}/allOutings`),
          axios.get(`${API_BASE_URL}/gallery`)
        ]);
        
        // Format product images
        const productImages = productsResponse.data.flatMap(product => 
          product.images.map((image) => ({
            image: image.startsWith('http') ? image : `${API_BASE_URL}${image}`,
            id: product._id,
            title: product.name,
            description: product.description,
            type: 'product',
            sortKey: `product-${product._id}-${product.name}`
          }))
        );

        // Format outing images
        const outingImages = outingsResponse.data.flatMap(outing => 
          outing.images.map((image) => ({
            image: image.startsWith('http') ? image : `${API_BASE_URL}${image}`,
            id: outing._id,
            title: outing.name,
            description: outing.description,
            type: 'outing',
            sortKey: `outing-${outing._id}-${outing.name}`
          }))
        );

        // Format gallery images
        const galleryImages = galleryResponse.data.map(image => ({
          image: image.imageUrl,
          id: image._id,
          title: image.title,
          description: image.description,
          type: 'gallery',
          sortKey: `gallery-${image._id}-${image.title}`
        }));

        // Combine all images and sort them by creation date
        const allImages = [...productImages, ...outingImages, ...galleryImages]
          .sort((a, b) => b.sortKey.localeCompare(a.sortKey));
        
        setImages(allImages);
        
        setTimeout(() => {
          setLoading(false);
        }, 300);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError(err.response?.data?.message || err.message || "Failed to fetch images");
        setLoading(false);
      }
    };

    fetchAllImages();
  }, []);
  
  // Track progress of loaded images
  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };
  
  // Calculate loading percentage
  const loadingProgress = images.length > 0 
    ? Math.floor((imagesLoaded / images.length) * 100) 
    : 0;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="w-48 h-10 bg-gray-300 animate-pulse mx-auto mb-8 rounded-md"></div>
        
        {/* Mobile Skeleton */}
        <div className="md:hidden space-y-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="w-full aspect-video">
              <SkeletonImage className="w-full h-full" />
            </div>
          ))}
        </div>
        
        {/* Desktop Skeleton - Bento grid layout */}
        <div className="hidden md:block space-y-16">
          {Array.from({ length: 2 }).map((_, sectionIndex) => (
            <div 
              key={sectionIndex} 
              className="grid grid-cols-3 gap-8"
            >
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="aspect-square">
                  <SkeletonImage className="w-full h-full" />
                </div>
              ))}
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

  // Split images into groups of 9 for each bento section
  const bentoSections = [];
  for (let i = 0; i < images.length; i += 9) {
    bentoSections.push(images.slice(i, i + 9));
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
        <>
          {/* Mobile View - Single column layout */}
          <div className="md:hidden space-y-4">
            {images.map((item, index) => (
              <motion.div
                key={item.sortKey}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                {item.type !== 'gallery' ? (
                  <Link to={`/${item.type}/${item.id}`} className="block">
                    <Card className="overflow-hidden border-0 hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-0">
                        <ProgressiveImage
                          src={item.image}
                          alt={item.title}
                          className="w-full aspect-video"
                          imageClassName="transition-transform duration-300 group-hover:scale-103"
                          onLoad={handleImageLoad}
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          {item.description && (
                            <p className="text-gray-600 mt-2">{item.description}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <Card className="overflow-hidden border-0 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <ProgressiveImage
                        src={item.image}
                        alt={item.title}
                        className="w-full aspect-video"
                        imageClassName="transition-transform duration-300 group-hover:scale-103"
                        onLoad={handleImageLoad}
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        {item.description && (
                          <p className="text-gray-600 mt-2">{item.description}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            ))}
          </div>

          {/* Desktop View - Bento grid layout */}
          <div className="hidden md:block space-y-16">
            {bentoSections.map((section, sectionIndex) => (
              <motion.div 
                key={sectionIndex} 
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid grid-cols-3 gap-8"
              >
                {section.map((item, index) => (
                  <motion.div
                    key={item.sortKey}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="aspect-square"
                  >
                    {item.type !== 'gallery' ? (
                      <Link to={`/${item.type}/${item.id}`}>
                        <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300 border-0">
                          <CardContent className="p-0 h-full">
                            <ProgressiveImage
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full"
                              imageClassName="object-cover transition-transform duration-500 group-hover:scale-110"
                              onLoad={handleImageLoad}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-4">
                              <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                {item.description && (
                                  <p className="text-sm mt-1">{item.description}</p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ) : (
                      <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300 border-0">
                        <CardContent className="p-0 h-full">
                          <ProgressiveImage
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full"
                            imageClassName="object-cover transition-transform duration-500 group-hover:scale-110"
                            onLoad={handleImageLoad}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-4">
                            <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                              <h3 className="text-lg font-semibold">{item.title}</h3>
                              {item.description && (
                                <p className="text-sm mt-1">{item.description}</p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Gallery;