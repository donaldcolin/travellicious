import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:4000/getreviews`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (isLoading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-4">
              {[...Array(review.rating)].map((_, j) => (
                <Star key={j} className="h-5 w-5 fill-current text-amber-400" />
              ))}
            </div>
            <p className="text-gray-600 mb-4">{review.comment}</p>
            <div className="flex items-center gap-3">
              <img 
                src={review.avatarUrl || "/api/placeholder/40/40"} 
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{review.name}</p>
                <p className="text-sm text-gray-500">Traveled in {review.date}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default Review;