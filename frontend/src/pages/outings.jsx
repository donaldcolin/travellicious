import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Button } from "../components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

export const Outings = () => {
  // Using the data from outingData, but with a safety check
  const outings =  [
    {
      id: 1,
      title: "Mountain Hiking Adventure",
      description: "Experience breathtaking views on this guided mountain trek",
      image: "/api/placeholder/400/300",
      date: "2025-02-15",
      duration: "6 hours",
      location: "Rocky Mountains"
    },
    {
      id: 2,
      title: "Beach Sunset Tour",
      description: "Enjoy a relaxing evening walk along the coastline",
      image: "/api/placeholder/400/300",
      date: "2025-02-20",
      duration: "3 hours",
      location: "Coastal Beach"
    },
    {
      id: 3,
      title: "Beach Sunset Tour",
      description: "Enjoy a relaxing evening walk along the coastline",
      image: "/api/placeholder/400/300",
      date: "2025-02-20",
      duration: "3 hours",
      location: "Coastal Beach"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Discover Amazing Outings
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore exciting adventures and create unforgettable memories with our carefully curated collection of outings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {outings.map((outing) => (
          <Card key={outing.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 overflow-hidden">
              <img
                src={outing.image}
                alt={outing.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            
            <CardHeader>
              <CardTitle className="text-xl">{outing.title}</CardTitle>
              <CardDescription>{outing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{outing.date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{outing.duration}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{outing.location}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full">Book Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Outings;