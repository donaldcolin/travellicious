import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Users, Clock, CheckCircle2, ChevronDown, Star, Loader2, Camera } from "lucide-react";
import ContactSideSheet from "../productdisplay/SideSheet";
import ImageGallery from "../utils/ImageGallery";
import ImageModal from "../utils/ImageModal";
import DateFormatter from "../utils/DateFormatter";
import { motion, useScroll, useInView } from "framer-motion";

const Section = ({ children, className = "", animate = true, innerRef }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(innerRef || sectionRef, { once: false, amount: 0.1 });

  return (
    <motion.div 
      ref={innerRef || sectionRef}
      className={`min-h-screen w-full flex items-center justify-center snap-start ${className}`}
      initial={animate ? { opacity: 0, y: 50 } : {}}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const ProgressBar = ({ containerRef }) => {
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

const Review = ({ review, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="p-4 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center gap-2 mb-4">
          {[...Array(5)].map((_, j) => (
            <Star
              key={j}
              className={`h-5 w-5 ${j < review.rating ? 'fill-current text-amber-400' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <p className="text-gray-600 mb-4">{review.comment}</p>
        <div className="flex items-center gap-3">
          <img 
            src={review.user?.avatar || '/api/placeholder/40/40'} 
            alt={review.user?.name || 'User'}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{review.user?.name || 'Anonymous'}</p>
            <p className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export const OutingDisplay = ({ outing }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const section2Ref = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:4000/getreviews');
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data = await response.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Review fetch error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const outingImages = Array.isArray(outing.images) 
    ? outing.images 
    : [outing.image || outing.images].filter(Boolean);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <div className="relative">
      <ProgressBar containerRef={scrollContainerRef} />
      
      <div 
        ref={scrollContainerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth"
      >
        {/* Section 1: Hero */}
        <Section animate={false} className="relative bg-gray-100 z-10">
          <div className="w-full max-w-6xl px-2">
            <motion.div 
              className="relative h-[70vh] w-full mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <ImageGallery 
                images={outingImages}
                productName={outing.name}
                onImageClick={() => setIsFullscreen(true)}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                swiper={swiper}
                setSwiper={setSwiper}
                className="w-full h-full rounded-xl overflow-hidden shadow-xl"
              />
            </motion.div>

            <motion.div 
              className="text-center space-y-4 relative z-20"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-6xl font-bold text-white drop-shadow-lg">
                {outing.name}
              </h1>
              <motion.button 
                onClick={() => scrollToSection(section2Ref)}
                className="animate-bounce p-2 rounded-full bg-white shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronDown className="w-6 h-6 text-blue-600" />
              </motion.button>
            </motion.div>
          </div>
        </Section>

        {/* Section 2: Details */}
        <Section innerRef={section2Ref} className="bg-white">
          <div className="w-full max-w-6xl mx-auto px-4 py-28 space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: MapPin, label: "Location", value: outing.location },
                { icon: Calendar, label: "Date", value: <DateFormatter date={outing.date} /> },
                { icon: Clock, label: "Duration", value: outing.duration },
                { icon: Users, label: "Group Size", value: outing.groupSize || "Flexible" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex flex-col items-center text-center gap-2">
                      <item.icon className="h-8 w-8 text-gray-600" />
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="text-lg font-semibold text-gray-900">{item.value}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="prose max-w-none"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">About this Outing</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{outing.description}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold">What's Included</h3>
                <div className="space-y-4">
                  {(outing.inclusions || []).map((inclusion, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                      <span className="text-gray-700">{inclusion}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold">Photo Opportunities</h3>
                <div className="space-y-4">
                  {(outing.photoSpots || []).map((spot, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Camera className="h-6 w-6 text-blue-500" />
                      <span className="text-gray-700">{spot}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="bg-gray-50 p-8 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <p className="text-lg text-gray-600">Event Date</p>
                  <h2 className="text-3xl font-bold">
                    <DateFormatter date={outing.date} />
                  </h2>
                </div>
                <div>
                  <p className="text-lg text-gray-600">Price per person</p>
                  <p className="text-3xl font-bold">₹{outing.price}</p>
                </div>
                <ContactSideSheet />
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Section 3: Reviews */}
        <Section className="bg-gray-50">
          <div className="w-full max-w-6xl mx-auto px-4 py-16">
            <motion.h2 
              className="text-3xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Participant Reviews
            </motion.h2>

            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : error ? (
              <div className="text-red-500 text-center p-6">
                Error loading reviews: {error}
              </div>
            ) : reviews.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                  <Review key={review._id || index} review={review} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 p-6">
                No reviews yet. Be the first to share your experience!
              </div>
            )}
          </div>
        </Section>
      </div>

      <ImageModal
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        images={outingImages}
        productName={outing.name}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        swiper={swiper}
        setSwiper={setSwiper}
      />
    </div>
  );
};

export default OutingDisplay;