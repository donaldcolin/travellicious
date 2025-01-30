import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

const CustomNavButton = ({ direction, onClick, className }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-200 ${
      direction === 'prev' ? 'left-4' : 'right-4'
    } ${className}`}
  >
    {direction === 'prev' ? (
      <ChevronLeft className="w-6 h-6 text-gray-800" />
    ) : (
      <ChevronRight className="w-6 h-6 text-gray-800" />
    )}
  </button>
);

export default CustomNavButton;