import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardHeader } from "@/components/ui/card";
import { MapPin, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Skeleton Loader Component
const OutingSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 aspect-[4/3] mb-4 rounded-lg"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

// Outing Card Component
const OutingCard = ({ outing, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        to={`/outing/${outing.id}`}
        className="block h-full"
      >
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <Card className="relative overflow-hidden h-full bg-white shadow-sm hover:shadow-xl transition-shadow duration-300">
            <div className="relative aspect-[4/3] w-full">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                src={outing.images[0]}
                alt={outing.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 transition-opacity duration-300 group-hover:opacity-60" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h2 className="text-xl font-semibold text-white mb-2 line-clamp-1">
                  {outing.name}
                </h2>
                <div className="flex items-center text-white/90">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">{outing.location}</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </Link>
    </motion.div>
  );
};

// Outing Content Component - This handles loading states
const OutingContent = () => {
  const [outings, setOutings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  const fetchOutings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/allOutings`);
      setOutings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching outings:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutings();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(6)].map((_, index) => <OutingSkeleton key={index} />)}
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-12"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Failed to Load Outings</h2>
          <p className="text-gray-600 mb-6">Unable to fetch outing details. Please check your connection.</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={fetchOutings} 
              className="flex items-center justify-center gap-2 mx-auto"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="inline-block"
              >
                <RefreshCw className="w-4 h-4" />
              </motion.div>
              Reload Outings
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (outings.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-12"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Outings Available</h2>
          <p className="text-gray-600 mb-6">We couldn't find any outings at the moment.</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={fetchOutings} 
              className="flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {outings.map((outing, index) => (
        <OutingCard key={outing.id} outing={outing} index={index} />
      ))}
    </div>
  );
};

// Main Outings Component
export const Outings = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      id="outings-section" 
      className="bg-gradient-to-b from-white to-gray-50 min-h-screen pt-24 pb-12"
    >
      <div className="container mx-auto px-4">
        {/* Static heading section with animation */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-gray-900">
            Explore Resorts Near Bangalore
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover memorable experiences within easy reach of the city
          </p>
        </motion.div>

        {/* Dynamic outing content that loads with skeleton */}
        <OutingContent />
      </div>
    </motion.div>
  );
};

export default Outings;