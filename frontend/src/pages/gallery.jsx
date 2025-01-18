import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { treksData } from "./trekData";
import { Card, CardContent } from "../components/ui/card.tsx";

export const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Flatten all images into a single array (once on load)
    const allImages = treksData.flatMap((trek) =>
      trek.images.map((image) => ({ image, trekId: trek.id }))
    );

    setImages(allImages); // Set the flattened image array to state
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* CSS Grid Container for irregular grid */}
      <div
        className="grid gap-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // 3 columns
          gridAutoRows: "200px", // Base row height
        }}
      >
        {images.map((imgData, index) => {
          // Predefined column and row spans for a consistent layout
          const colSpan = index % 5 === 0 ? 2 : 1; // Example logic for larger spans
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
    </div>
  );
};