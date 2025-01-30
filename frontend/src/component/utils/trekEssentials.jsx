// components/TrekEssentials.jsx
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const essentials = [
  {
    title: 'Difficulty Level',
    content: 'Moderate with steep ascents. Requires good physical fitness.',
  },
  {
    title: 'Best Season',
    content: 'March to June & September to November',
  },
  {
    title: 'Essential Gear',
    content: 'Trekking shoes, backpack, water bottles, sunscreen, first-aid kit',
  },
];

export const TrekEssentials = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="border rounded-xl bg-white">
      {essentials.map((item, index) => (
        <div key={index} className="border-b last:border-b-0">
          <button
            className="w-full p-4 flex justify-between items-center hover:bg-gray-50"
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <h3 className="font-semibold text-gray-800">{item.title}</h3>
            <ChevronDown className={`transform transition-transform ${
              activeIndex === index ? 'rotate-180' : ''
            }`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${
            activeIndex === index ? 'max-h-40' : 'max-h-0'
          }`}>
            <div className="p-4 pt-0 text-gray-600">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};