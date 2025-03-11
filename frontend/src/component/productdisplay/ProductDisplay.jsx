import React, { useState, useRef, useEffect, Suspense, lazy } from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Mountain, Clock, Footprints, CheckCircle2, ChevronDown, Star, Loader2 } from 'lucide-react';
import { motion, useScroll, useInView } from 'framer-motion';

// Lazy loading components
const ContactSideSheet = lazy(() => import('./SideSheet'));
const ImageGallery = lazy(() => import('../utils/ImageGallery'));
const Review = lazy(() => import('./Review'));
const DateFormatter = lazy(() => import('../utils/DateFormatter'));

const Section = React.memo(({ children, className = '', animate = true, innerRef }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(innerRef || sectionRef, { once: false, amount: 0.1 });

  return (
    <motion.div
      ref={innerRef || sectionRef}
      className={`min-h-screen w-full flex items-center justify-center snap-start ${className}`}
      initial={animate ? { opacity: 0, y: 50 } : {}}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
});

const ProgressBar = React.memo(({ containerRef }) => {
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
});

export const ProductDisplay = ({ product }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const section2Ref = useRef(null);
  const scrollContainerRef = useRef(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/getreviews`);
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data = await response.json();
        setReviews(data.reviews || []);
      } catch (err) {
        console.error('Review fetch error:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchReviews();
  }, []);

  const productImages = Array.isArray(product.images)
    ? product.images
    : [product.image || product.images].filter(Boolean);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            <Suspense fallback={<div>Loading images...</div>}>
              <ImageGallery
                images={productImages}
                productName={product.name}
                onImageClick={() => setIsFullscreen(true)}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                swiper={swiper}
                setSwiper={setSwiper}
                className="w-full h-full rounded-2xl overflow-hidden shadow-xl"
              />
            </Suspense>
            <motion.div
              className="text-center space-y-4 relative z-20"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.button
                onClick={() => scrollToSection(section2Ref)}
                className="animate-bounce p-2 rounded-full bg-white shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll to details"
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
                { icon: MapPin, label: 'Location', value: product.location },
                { icon: Mountain, label: 'Altitude', value: product.altitude || 'N/A' },
                { icon: Clock, label: 'Duration', value: product.duration || 'N/A' },
                { icon: Footprints, label: 'Grade', value: product.difficulty || 'N/A' },
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
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold">Included Services</h3>
                <div className="space-y-4">
                  {Object.entries(product.services || {}).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                      <span className="text-gray-700">{value}</span>
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
                <h3 className="text-2xl font-bold">Key Attractions</h3>
                <div className="space-y-4">
                  {(product.attractions || []).map((attraction, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Star className="h-6 w-6 text-amber-500" />
                      <span className="text-gray-700">{attraction}</span>
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
                  <p className="text-lg text-gray-600">Next available date</p>
                  <Suspense fallback={<div>Loading date...</div>}>
                    <DateFormatter date={product.nextdate} />
                  </Suspense>
                </div>
                <div>
                  <p className="text-lg text-gray-600">Price per person</p>
                  <p className="text-3xl font-bold">
                    ₹{typeof product.price === 'object' ? product.price.single : product.price}
                  </p>
                </div>
                <Suspense fallback={<div>Loading contact sheet...</div>}>
                  <ContactSideSheet />
                </Suspense>
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
              Traveler Experiences
            </motion.h2>

            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="ml-4">Loading reviews...</p>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center p-6">
                <p>Error loading reviews: {error}</p>
                <button onClick={() => setReviews([])} className="text-blue-500 hover:underline">
                  Retry
                </button>
              </div>
            ) : reviews.length > 0 ? (
              <Suspense fallback={<div>Loading reviews...</div>}>
                <Review reviews={reviews} />
              </Suspense>
            ) : (
              <div className="text-center text-gray-500 p-6">
                No reviews yet. Be the first to share your experience!
              </div>
            )}
          </div>
        </Section>
      </div>
    </div>
  );
};

export default ProductDisplay;