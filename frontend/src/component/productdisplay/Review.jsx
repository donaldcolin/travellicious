// components/Review.jsx
import React from 'react';
import { AnimatedTestimonials } from '../../components/ui/animated-testimonials';

const Review = ({ reviews }) => {
  // Check if reviews is an array
  if (!Array.isArray(reviews)) {
    return <div>Loading...</div>;
  }

  // Transform reviews into the format expected by AnimatedTestimonials
  const testimonials = reviews.map(review => ({
    _id: review._id,
    src: review.avatarUrl || "https://placehold.co/600x400",
    name: review.name,
    designation: `Traveled in ${review.date || 'Unknown'}`,
    quote: review.review,
    rating: review.rating,
  }));

  return (
    <div className="max-w-4xl mx-auto py-10">
      
      {testimonials.length > 0 ? (
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      ) : (
        <div className="text-center text-gray-500 p-6">
          No reviews yet. Be the first to share your experience!
        </div>
      )}
    </div>
  );
};

export default Review;