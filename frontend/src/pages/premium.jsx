import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-datepicker/dist/react-datepicker.css';
import ContactSideSheet from '../component/productdisplay/SideSheet';
import { Button } from "@/components/ui/button";
import { useInView } from 'react-intersection-observer';

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
  const [autoplay, setAutoplay] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Premium van images - replace placeholders with actual van images
  const vanImages = [
    'https://placehold.co/1920x1080?text=Luxury+Van+Exterior',
    'https://placehold.co/1920x1080?text=Spacious+Interior',
    'https://placehold.co/1920x1080?text=Premium+Features',
    'https://placehold.co/1920x1080?text=Comfort+Experience',
  ];

  // References for scroll animations with higher threshold for more reliable triggering
  const [featuresRef, featuresInView] = useInView({ 
    triggerOnce: true, 
    threshold: 0.05,
    rootMargin: "50px 0px"
  });
  
  const [galleryRef, galleryInView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "50px 0px"
  });

  // Van features with better icons and descriptions
  const vanFeatures = [
    { 
      icon: "👥", 
      title: "10 Luxurious Seats", 
      description: "Ultra-comfortable seating with premium leather upholstery and individual adjustments for all passengers"
    },
    { 
      icon: "🌡️", 
      title: "Climate Perfection", 
      description: "Advanced multi-zone climate control system allowing each section to set their ideal temperature" 
    },
    { 
      icon: "🎵", 
      title: "Immersive Entertainment", 
      description: "Bose premium sound system with individual audio controls and integrated streaming services" 
    },
    { 
      icon: "🔌", 
      title: "Complete Connectivity", 
      description: "High-speed WiFi, wireless charging pads, and multiple USB-C/USB-A ports at every seat" 
    },
    { 
      icon: "🚪", 
      title: "Easy Access Design", 
      description: "Power sliding doors and adjustable entry steps for effortless boarding and exiting" 
    },
    { 
      icon: "🧳", 
      title: "Generous Storage", 
      description: "Customized storage solutions including overhead compartments and a spacious rear luggage area" 
    }
  ];

  // Testimonials section
  const testimonials = [
    {
      text: "The premium van made our company retreat truly special. The comfort and luxury were beyond our expectations!",
      author: "Sarah Johnson",
      position: "Marketing Director",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    {
      text: "My family was impressed with every detail. From the entertainment system to the smooth ride, it was a perfect experience.",
      author: "Michael Chen",
      position: "Travel Blogger",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      text: "Our wedding party traveled in style. The driver was professional and the van's amenities made the journey as memorable as the destination.",
      author: "Eliza Moore",
      position: "Recent Bride",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg"
    }
  ];

  // Autoplay for hero carousel with proper cleanup
  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % vanImages.length);
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, vanImages.length]);

  // Track mouse position for parallax effects with throttling for performance
  useEffect(() => {
    let timeoutId = null;
    
    const handleMouseMove = (e) => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          timeoutId = null;
        }, 50); // Throttle to 50ms
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Animation variants - made stable outside of render
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

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
    <div className="bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Dynamic background with gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-70 z-10"></div>
        
        {/* Background pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2LTJoLTF2MnptMCA1aDEwdjFIMzZ2LTF6bTAtM2g2djFoLTZ2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 z-5"></div>
        
        {/* Image carousel with fade transition */}
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            src={vanImages[currentImageIndex]} 
            alt="Luxury Van" 
            className="w-full h-full object-cover"
            style={{
              transform: `translate(${mousePosition.x / 200}px, ${mousePosition.y / 200}px) scale(1.05)`
            }}
          />
        </AnimatePresence>
        
        {/* Carousel navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {vanImages.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => {
                setCurrentImageIndex(idx);
                setAutoplay(false);
              }}
              className={`w-16 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentImageIndex 
                  ? 'bg-white w-24' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`View image ${idx + 1}`}
            />
          ))}
        </div>
        
        {/* Hero content with advanced animations */}
        <div className="absolute inset-0 flex items-center z-30 px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="w-full max-w-4xl mx-auto md:mx-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-black/30 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">Premium</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">Group Travel</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-6 sm:mb-8 max-w-2xl"
              >
                Experience unparalleled comfort and style in our meticulously designed luxury van. Perfect for corporate events, family gatherings, or special occasions.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <ContactSideSheet />
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-black transition-all w-full sm:w-auto">
                    View Gallery
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Floating highlight badges with slower animation and reduced transform to prevent layout issues */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute top-1/4 right-8 lg:right-16 hidden md:block"
        >
          <div className="bg-white/10 backdrop-blur-md text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-white/20">
            ⭐ Luxury 10-Passenger Capacity
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-1/3 left-8 lg:left-16 hidden md:block"
        >
          <div className="bg-white/10 backdrop-blur-md text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-white/20">
            🔊 Premium Entertainment System
          </div>
        </motion.div>
      </section>

      {/* Van Features - with 3D cards */}
      <div ref={featuresRef} className="w-full">
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          className="py-16 sm:py-24 bg-gradient-to-b from-[#0a0a0a] to-[#121212]"
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-12 sm:mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={featuresInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-6"
              >
                <span className="text-xs uppercase tracking-widest bg-gradient-to-r from-amber-500 to-yellow-300 bg-clip-text text-transparent font-bold px-4 py-2 border border-amber-500/20 rounded-full">
                  Exceptional Amenities
                </span>
              </motion.div>
              
              <motion.h2 
                variants={fadeInUp} 
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400"
              >
                Premium Van Experience
              </motion.h2>
              
              <motion.p 
                variants={fadeInUp} 
                className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto"
              >
                Our luxury 10-passenger van combines sophisticated design, cutting-edge technology, and thoughtful details for an unmatched travel experience.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {vanFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ 
                    y: -10, 
                    boxShadow: "0 25px 50px -12px rgba(250, 204, 21, 0.15)" 
                  }}
                  className="bg-[#18181b] p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-amber-500/20 transition-all duration-500 h-full"
                >
                  <div className="text-4xl sm:text-5xl mb-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>

      {/* Interactive Gallery Section */}
      <div ref={galleryRef} className="w-full">
        <motion.section 
          initial="hidden"
          animate={galleryInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="py-16 sm:py-24 bg-[#121212] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2LTJoLTF2MnptMCA1aDEwdjFIMzZ2LTF6bTAtM2g2djFoLTZ2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10 z-5"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-12 sm:mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={galleryInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-6"
              >
                <span className="text-xs uppercase tracking-widest bg-gradient-to-r from-amber-500 to-yellow-300 bg-clip-text text-transparent font-bold px-4 py-2 border border-amber-500/20 rounded-full">
                  Visual Tour
                </span>
              </motion.div>
              
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400"
              >
                Luxury in Every Detail
              </motion.h2>
              
              <motion.p 
                variants={fadeInUp}
                className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto"
              >
                Experience the perfect blend of aesthetic excellence and functional design
              </motion.p>
            </motion.div>

            {/* Responsive grid that works on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="col-span-1 sm:col-span-2 lg:col-span-8 overflow-hidden rounded-2xl h-64 md:h-80 lg:h-96"
              >
                <img src={vanImages[0]} alt="Van Exterior" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
              
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="col-span-1 sm:col-span-2 lg:col-span-4 overflow-hidden rounded-2xl h-64 md:h-80 lg:h-96"
              >
                <img src={vanImages[1]} alt="Van Interior" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
              
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="col-span-1 sm:col-span-1 lg:col-span-5 overflow-hidden rounded-2xl h-64 md:h-80"
              >
                <img src={vanImages[2]} alt="Van Features" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
              
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="col-span-1 sm:col-span-1 lg:col-span-7 overflow-hidden rounded-2xl h-64 md:h-80"
              >
                <img src={vanImages[3] || vanImages[0]} alt="Van Experience" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-[#0a0a0a] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <span className="text-xs uppercase tracking-widest bg-gradient-to-r from-amber-500 to-yellow-300 bg-clip-text text-transparent font-bold px-4 py-2 border border-amber-500/20 rounded-full">
                Client Experiences
              </span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              What Our Clients Say
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Join the ranks of satisfied clients who have experienced our premium transport service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-[#18181b] to-[#1c1c20] p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-amber-500/20 transition-all duration-300 relative"
              >
                <div className="absolute -top-6 left-8 bg-gradient-to-br from-amber-400 to-amber-600 p-1 rounded-full">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                
                <div className="pt-6">
                  <div className="text-4xl text-amber-500 absolute top-8 right-8 opacity-30">"</div>
                  <p className="text-gray-300 mb-6 relative z-10">{testimonial.text}</p>
                  
                  <div>
                    <h4 className="font-medium text-white">{testimonial.author}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#121212] to-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmYWNjMTUiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2LTJoLTF2MnptMCA1aDEwdjFIMzZ2LTF6bTAtM2g2djFoLTZ2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20 z-5"></div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center px-4 relative z-10"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-8"
          >
            <span className="inline-flex items-center justify-center px-6 py-2 bg-amber-500/10 rounded-full">
              <span className="animate-pulse inline-block w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
              <span className="text-amber-400 font-medium">Booking Now Open</span>
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300"
          >
            Elevate Your Group Transportation Experience
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-gray-400 mb-12"
          >
            Whether for business or leisure, our premium service ensures comfort, style, and reliability for your journey
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <ContactSideSheet />
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button variant="outline" size="lg" className="bg-transparent border-white/20 text-white hover:bg-white hover:text-black transition-all w-full sm:w-auto">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default PremiumPage;