import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardHeader } from "@/components/ui/card";
import { MapPin, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

// Skeleton Loader Component
const OutingSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 aspect-[4/3] mb-4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

// Outing Card Component
const OutingCard = ({ outing }) => {
  return (
    <Link
      to={`/outing/${outing.id}`}
      className="block transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
    >
      <Card className="relative overflow-hidden h-full bg-white group">
        <div className="relative aspect-[4/3] w-full">
          <img
            src={outing.images[0]}
            alt={outing.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Gradient overlay that fades out on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 transition-opacity duration-300 group-hover:opacity-0" />

          {/* Content that fades out on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 group-hover:opacity-0">
            <h2 className="text-xl font-semibold text-white mb-2 line-clamp-1">
              {outing.name}
            </h2>
            <div className="flex items-center text-white/90">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{outing.location}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

// Main Outings Component
export const Outings = () => {
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

  if (loading) return (
    <div className="container mx-auto px-4 pt-24 grid grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => <OutingSkeleton key={index} />)}
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 pt-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Failed to Load Outings</h2>
        <p className="text-gray-600 mb-6">Unable to fetch outing details. Please check your connection.</p>
        <Button 
          onClick={fetchOutings} 
          className="flex items-center justify-center gap-2 mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Reload Outings
        </Button>
      </div>
    </div>
  );

  if (outings.length === 0) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 pt-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Outings Available</h2>
        <p className="text-gray-600 mb-6">We couldn't find any outings at the moment.</p>
        <Button 
          onClick={fetchOutings} 
          className="flex items-center justify-center gap-2 mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      </div>
    </div>
  );

  return (
    <div id="outings-section" className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Explore Adventures Near Bangalore
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover breathtaking trails and memorable experiences within easy reach of the city
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
          {outings.map((outing) => (
            <OutingCard key={outing.id} outing={outing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Outings;