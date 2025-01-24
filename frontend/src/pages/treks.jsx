import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardHeader } from "../components/ui/card.tsx";
import { MapPin } from "lucide-react";

export const Treks = () => {
  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTreks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/allproducts');
        setTreks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching treks:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTreks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="treks-section" className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Explore Adventures Near Bangalore
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover breathtaking trails and memorable experiences within easy reach of the city
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {treks.map((trek) => (
            <Link
              to={`/treks/${trek.id}`}
              key={trek.id}
              className="transform transition-all duration-300 hover:scale-102 hover:-translate-y-1"
            >
              <Card className="overflow-hidden h-full bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={trek.image}
                    alt={trek.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                <CardHeader className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold line-clamp-1">
                        {trek.name}
                      </h2>
                      <div className="flex items-center text-gray-600 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{trek.location}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Treks;