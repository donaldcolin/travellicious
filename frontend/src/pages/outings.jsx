import React from "react";
import "./css/outing.css"; // Create a CSS file for styling if needed

export const Outings = () => {
  const outings = [
    {
      id: 1,
      title: "Beach Day at Malibu",
      description: "Relax and enjoy a sunny day at Malibu Beach.",
      image: "https://via.placeholder.com/300", // Replace with a real image
    },
    {
      id: 2,
      title: "City Lights Tour",
      description: "Explore the city's most iconic landmarks at night.",
      image: "https://via.placeholder.com/300", // Replace with a real image
    },
    {
      id: 3,
      title: "Mountain Picnic",
      description: "A scenic picnic in the serene mountain landscape.",
      image: "https://via.placeholder.com/300", // Replace with a real image
    },
  ];

  return (
    <div className="outings-page">
      <h1 className="outings-title">Welcome to the Outings Page</h1>
      <p className="outings-subtitle">Explore exciting outings and plan your next adventure!</p>
      
      <div className="outings-list">
        {outings.map((outing) => (
          <div key={outing.id} className="outing-card">
            <img src={outing.image} alt={outing.title} className="outing-image" />
            <h2 className="outing-title">{outing.title}</h2>
            <p className="outing-description">{outing.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};