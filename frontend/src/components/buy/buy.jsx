import React from "react";
import "./buy.css";

export const Buy = ({ productName, singlePrice, closePopup }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
    closePopup();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Book Your Trek: {productName}</h2>
        <p>
          <strong>Price:</strong> ₹{singlePrice}
        </p>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
          <label>
            Phone:
            <input type="tel" name="phone" required />
          </label>
          <label>
            Email:
            <input type="email" name="email"  />
          </label>
          <label>
            Date:
            <input type="date" name="date" required />
          </label>
          <div className="popup-actions">
            <button type="submit" className="submit-button">
              Submit
            </button>
            <button
              type="button"
              className="close-button"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};