import React, { useState } from "react";
import "./productDisplay.css";
import { Buy } from "../buy/buy.jsx"; // Import the Buy component

export const ProductDisplay = ({ product }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedImage, setSelectedImage] = useState(product.images[0]); // Default to the first image

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const singlePrice = product.price.single;

  return (
    <div className="product-display">
      <div className="product-display-left">
        {/* Large Image */}
        <div className="main-image">
          <img src={selectedImage} alt={product.name} />
        </div>

        {/* Image Thumbnails */}
        <div className="image-gallery">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${image === selectedImage ? "active" : ""}`}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
      </div>

      <div className="product-display-right">
        <h1>{product.name}</h1>
        <p className="price">
          <strong>Rate:</strong> ₹{singlePrice}
        </p>
        <div className="date-selector">
          <label htmlFor="date">
            <strong>Select Date:</strong>
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <h2>Description</h2>
        <p>{product.description}</p>
        <h2>Details</h2>
        <ul>
          <li>
            <strong>Location:</strong> {product.location}
          </li>
          <li>
            <strong>Duration:</strong> {product.duration}
          </li>
          <li>
            <strong>Attractions:</strong>
            <ul>
              {product.attractions.map((attraction, index) => (
                <li key={index}>{attraction}</li>
              ))}
            </ul>
          </li>
        </ul>
        <button className="buy-button" onClick={togglePopup}>
          Proceed to Buy
        </button>
      </div>

      {/* Popup Component */}
      {isPopupVisible && (
        <Buy
          productName={product.name}
          singlePrice={singlePrice}
          selectedDate={selectedDate}
          closePopup={togglePopup}
        />
      )}
    </div>
  );
};