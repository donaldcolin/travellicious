import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card,CardContent } from "@/components/ui/card";

export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:4000/allimages');
        
        const formattedImages = response.data.image_urls.map((imageUrl, index) => ({
          image: imageUrl.startsWith('http') ? imageUrl : `http://localhost:4000${imageUrl}`,
          trekId: index + 1
        }));

        setImages(formattedImages);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Failed to fetch images");
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {images.length === 0 ? (
        <p className="text-center text-gray-500">No images found</p>
      ) : (
        <div 
          className="grid grid-cols-3 gap-4"
          style={{
            gridAutoRows: "200px",
          }}
        >
          {images.map((imgData, index) => {
            const colSpan = index % 5 === 0 ? 2 : 1;
            const rowSpan = index % 7 === 0 ? 2 : 1;

            return (
              <Link
                to={`/product/${imgData.trekId}`}
                key={index}
                className="block overflow-hidden"
                style={{
                  gridColumn: `span ${colSpan}`,
                  gridRow: `span ${rowSpan}`,
                }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                  <CardContent className="p-0">
                    <div className="w-full h-full relative">
                      <img
                        src={imgData.image}
                        alt={`Trek Image ${index + 1}`}
                        className="object-cover w-full h-full rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};