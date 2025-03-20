import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        const [productsResponse, outingsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/allproducts`),
          axios.get(`${API_BASE_URL}/allOutings`),
       

        ]);
        
        // Format product images
        const productImages = productsResponse.data.flatMap(product => 
          product.images.map((image) => ({
            image: image.startsWith('http') ? image : `${API_BASE_URL}${image}`,
            id: product.id,
            name: product.name,
            type: 'product',
            // Add a stable sortKey
            sortKey: `product-${product.id}-${product.name}`
          }))
        );

        // Format outing images
        const outingImages = outingsResponse.data.flatMap(outing => 
          outing.images.map((image) => ({
            image: image.startsWith('http') ? image : `${API_BASE_URL}${image}`,
            id: outing.id,
            name: outing.name,
            type: 'outing',
            // Add a stable sortKey
            sortKey: `outing-${outing.id}-${outing.name}`
          }))
        );

        // Combine all images and sort them by the stable sortKey
        // This ensures consistent ordering across page reloads
        const allImages = [...productImages, ...outingImages].sort((a, b) => 
          a.sortKey.localeCompare(b.sortKey)
        );
        
        setImages(allImages);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Failed to fetch images");
        setLoading(false);
      }
    };

    fetchAllImages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen pt-16">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-12 w-12 border-2 border-black border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-24">
        {error}
      </div>
    );
  }

  // Split images into groups of 8 for each bento section
  const bentoSections = [];
  for (let i = 0; i < images.length; i += 8) {
    bentoSections.push(images.slice(i, i + 8));
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
      
      {images.length === 0 ? (
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
                <Link to={`/${item.type}/${item.id}`} className="block relative group">
                  <Card className="overflow-hidden border-0 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <motion.img
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                        src={item.image}
                        alt={`${item.name} Image`}
                        className="w-full aspect-video object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                        <h3 className="text-white text-lg font-semibold px-4 text-center">
                          {item.name}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
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
                className="grid grid-cols-4 grid-rows-3 gap-4 sm:gap-6 md:gap-8 auto-rows-fr"
              >
                {section.length > 0 && (
                  <Link
                    to={`/${section[0].type}/${section[0].id}`}
                    className="col-span-2 row-span-2 relative group"
                  >
                    <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 border-0">
                      <CardContent className="p-0 h-full">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                          src={section[0].image}
                          alt={`${section[0].name} Image`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                          <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold px-4 text-center">
                            {section[0].name}
                          </h3>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )}
                
                {section.length > 1 && (
                  <Link
                    to={`/${section[1].type}/${section[1].id}`}
                    className="col-span-2 row-span-1 relative group"
                  >
                    <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 border-0">
                      <CardContent className="p-0 h-full">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                          src={section[1].image}
                          alt={`${section[1].name} Image`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                          <h3 className="text-white text-sm sm:text-base md:text-lg font-semibold px-4 text-center">
                            {section[1].name}
                          </h3>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )}
                
                {section.length > 2 && (
                  <Link
                    to={`/${section[2].type}/${section[2].id}`}
                    className="col-span-1 row-span-1 relative group"
                  >
                    <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 border-0">
                      <CardContent className="p-0 h-full">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                          src={section[2].image}
                          alt={`${section[2].name} Image`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                          <h3 className="text-white text-xs sm:text-sm md:text-base font-semibold px-2 text-center">
                            {section[2].name}
                          </h3>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )}
                
                {section.length > 3 && (
                  <Link
                    to={`/${section[3].type}/${section[3].id}`}
                    className="col-span-1 row-span-2 relative group"
                  >
                    <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 border-0">
                      <CardContent className="p-0 h-full">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                          src={section[3].image}
                          alt={`${section[3].name} Image`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                          <h3 className="text-white text-xs sm:text-sm md:text-base font-semibold px-2 text-center">
                            {section[3].name}
                          </h3>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )}
                
                {section.length > 4 && (
                  <Link
                    to={`/${section[4].type}/${section[4].id}`}
                    className="col-span-1 row-span-1 relative group"
                  >
                    <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 border-0">
                      <CardContent className="p-0 h-full">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                          src={section[4].image}
                          alt={`${section[4].name} Image`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                          <h3 className="text-white text-xs sm:text-sm md:text-base font-semibold px-2 text-center">
                            {section[4].name}
                          </h3>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )}
                
                {section.length > 5 && (
                  <Link
                    to={`/${section[5].type}/${section[5].id}`}
                    className="col-span-1 row-span-1 relative group"
                  >
                    <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 border-0">
                      <CardContent className="p-0 h-full">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                          src={section[5].image}
                          alt={`${section[5].name} Image`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                          <h3 className="text-white text-xs sm:text-sm md:text-base font-semibold px-2 text-center">
                            {section[5].name}
                          </h3>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )}
                
                {section.length > 6 && (
                  <Link
                    to={`/${section[6].type}/${section[6].id}`}
                    className="col-span-2 row-span-1 relative group"
                  >
                    <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 border-0">
                      <CardContent className="p-0 h-full">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                          src={section[6].image}
                          alt={`${section[6].name} Image`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                          <h3 className="text-white text-sm sm:text-base md:text-lg font-semibold px-4 text-center">
                            {section[6].name}
                          </h3>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )}
                
                {section.length > 7 && (
                  <Link
                    to={`/${section[7].type}/${section[7].id}`}
                    className="col-span-2 row-span-1 relative group"
                  >
                    <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 border-0">
                      <CardContent className="p-0 h-full">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                          src={section[7].image}
                          alt={`${section[7].name} Image`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                          <h3 className="text-white text-sm sm:text-base md:text-lg font-semibold px-4 text-center">
                            {section[7].name}
                          </h3>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Gallery;