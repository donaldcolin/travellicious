import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { treksData } from "./trekData";
import "./css/gallery.css";

// Utility function to shuffle an array
const shuffleArray = (array) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

export const Gallery = () => {
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    // Flatten all images into a single array
    const allImages = treksData.flatMap((trek) =>
      trek.images.map((image) => ({ image, trekId: trek.id }))
    );

    // Shuffle the images once and save to state
    setShuffledImages(shuffleArray(allImages));
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="gallery">
      {shuffledImages.map((imgData, index) => (
        <Link to={`/product/${imgData.trekId}`} key={index}>
          <div className="image-container">
            <img
              src={imgData.image}
              alt={`Trek Image ${index + 1}`}
              className="gallery-image"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};