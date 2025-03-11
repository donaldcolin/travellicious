import React, { useState } from 'react';
import { motion } from 'framer-motion';
import 'react-datepicker/dist/react-datepicker.css';
import ContactSideSheet from '../component/productdisplay/SideSheet';

const PremiumPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    travelDate: null,
    passengers: 1,
    specialRequests: ''
  });
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Premium van images - replace placeholders with actual van images
  const vanImages = [
    'https://placehold.co/800x450?text=Luxury+Van+Exterior',
    'https://placehold.co/800x450?text=Spacious+Interior',
    'https://placehold.co/800x450?text=Premium+Features',
    'https://placehold.co/800x450?text=Comfortable+Seating'
  ];

  // Van features
  const vanFeatures = [
    { icon: "👥", title: "10 Passengers", description: "Spacious seating for up to 10 people" },
    { icon: "🛋️", title: "Premium Comfort", description: "Luxurious leather seats with ample legroom" },
    { icon: "❄️", title: "Climate Control", description: "Dual-zone climate system for perfect comfort" },
    { icon: "🎵", title: "Entertainment", description: "Premium sound system with Bluetooth connectivity" },
    { icon: "🔋", title: "USB Ports", description: "Charging ports accessible to all passengers" },
    { icon: "🧳", title: "Luggage Space", description: "Generous storage for all your travel needs" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormState(prev => ({ ...prev, travelDate: date }));
  };

  const handlePassengerChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 10) {
      setFormState(prev => ({ ...prev, passengers: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you for your booking request! We'll contact you shortly to confirm details.");
      setShowBookingForm(false);
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-600 opacity-70 z-10"></div>
        <img 
          src={vanImages[currentImageIndex]} 
          alt="Luxury Van" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-5 right-5 z-20 flex space-x-2">
          {vanImages.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentImageIndex(idx)}
              className={`w-3 h-3 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-gray-400'}`}
            />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-start z-20 px-8 md:px-16 lg:px-24"
        >
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Premium <br />Group Travel
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8 drop-shadow-md">
              Luxury van for your adventures with friends and family
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <ContactSideSheet />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Van Features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Premium Van Experience</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our luxury 10-passenger van combines comfort, style, and functionality for the ultimate group travel experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vanFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Experience Luxury</h2>
            <p className="text-xl text-gray-600">Take a closer look at our premium vehicle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {vanImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition duration-300"
              >
                <img src={image} alt={`Van Feature ${index + 1}`} className="w-full h-64 object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PremiumPage;