import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        const [productsResponse, outingsResponse] = await Promise.all([
          axios.get('http://localhost:4000/allproducts'),
          axios.get('http://localhost:4000/allOutings')
        ]);
        
        // Format product images
        const productImages = productsResponse.data.flatMap(product => 
          product.images.map((image) => ({
            image: image.startsWith('http') ? image : `http://localhost:4000${image}`,
            id: product.id,
            name: product.name,
            type: 'product'
          }))
        );

        // Format outing images
        const outingImages = outingsResponse.data.flatMap(outing => 
          outing.images.map((image) => ({
            image: image.startsWith('http') ? image : `http://localhost:4000${image}`,
            id: outing.id,
            name: outing.name,
            type: 'outing'
          }))
        );

        // Combine and shuffle images
        const allImages = [...productImages, ...outingImages].sort(() => Math.random() - 0.5);
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
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

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {images.length === 0 ? (
        <p className="text-center text-gray-500">No images found</p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
          {images.map((imgData, index) => (
            <Link
              to={`/${imgData.type}/${imgData.id}`}
              key={index}
              className="block mb-8 break-inside-avoid"
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group relative">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={imgData.image}
                      alt={`${imgData.name} Image`}
                      className="w-full object-cover rounded-lg min-h-[350px] max-h-[500px]"
                    />
                    {/* Overlay with name and type */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex flex-col items-center justify-center rounded-lg">
                      <h3 className="text-white text-2xl font-semibold px-6 text-center">
                        {imgData.name}
                      </h3>
                      
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;