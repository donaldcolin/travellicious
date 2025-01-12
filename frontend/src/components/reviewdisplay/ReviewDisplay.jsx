import React from "react";
import "./ReviewDisplay.css"; // Import the CSS file for styling

export const ReviewDisplay = ({ reviews }) => {
  return (
    <div className="review-display">
      <h1 className="review-title">Customer Reviews</h1>
      {reviews.length > 0 ? (
        <div className="review-list">
          {reviews.map((review, index) => (
            <div className="review-card" key={index}>
              <div className="review-header">
                <h3 className="review-author">{review.author}</h3>
                <div className="review-rating">
                  {"★".repeat(review.rating)}{" "}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>
              <p className="review-text">{review.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-reviews">No reviews yet. Be the first to leave one!</p>
      )}
    </div>
  );
};