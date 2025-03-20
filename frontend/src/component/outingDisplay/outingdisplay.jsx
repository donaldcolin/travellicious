import React, { useRef, Suspense, lazy } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, useScroll, useInView } from 'framer-motion';
import { 
  Calendar, MapPin, Users, Tag, Clock, 
  ChevronDown, ArrowRight, Camera, Loader2 
} from 'lucide-react';

// Lazy loading components
const ImageGallery = lazy(() => import('../utils/ImageGallery'));

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
      className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
});

export const OutingDisplay = ({ outing }) => {
  const scrollContainerRef = useRef(null);
  const detailsRef = useRef(null);
  const participantsRef = useRef(null);

  if (!outing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8"
        >
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-gray-400" />
          <p className="text-xl text-gray-500">No outing data available</p>
        </motion.div>
      </div>
    );
  }

  // Process images if they exist
  const outingImages = outing.images 
    ? (Array.isArray(outing.images) ? outing.images : [outing.images]) 
    : ['/placeholder-outing.jpg'];

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
          <motion.div 
            className="w-full max-w-6xl px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {outing.name}
            </motion.h1>
            
            <motion.div 
              className="flex flex-wrap gap-2 mb-6"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {outing.tags && outing.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-white/80 backdrop-blur-sm">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </motion.div>

            <div className="mb-8 relative rounded-xl overflow-hidden shadow-2xl h-[50vh]">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <Camera className="h-12 w-12 text-gray-400" />
                </div>
              }>
                {outingImages.length > 0 && (
                  <ImageGallery
                    images={outingImages}
                    productName={outing.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </Suspense>
            </div>

            <motion.div
              className="text-center space-y-4 relative z-20"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.button
                onClick={() => scrollToSection(detailsRef)}
                className="animate-bounce p-2 rounded-full bg-white shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll to details"
              >
                <ChevronDown className="w-6 h-6 text-black" />
              </motion.button>
            </motion.div>
          </motion.div>
        </Section>

        {/* Section 2: Details */}
        <Section innerRef={detailsRef} className="bg-white">
          <div className="w-full max-w-6xl mx-auto px-4 py-16 space-y-12">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {[
                { icon: Calendar, label: 'Date', value: outing.date },
                { icon: MapPin, label: 'Location', value: outing.location },
                { icon: Clock, label: 'Duration', value: outing.duration || 'TBD' },
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
            </motion.div>

            <motion.div
              className="prose max-w-none"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">About This Outing</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{outing.description}</p>
            </motion.div>

            <motion.div
              className="flex justify-between items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold">Participants</h3>
              <motion.button
                onClick={() => scrollToSection(participantsRef)}
                className="flex items-center text-gray-700 hover:text-black transition-colors"
                whileHover={{ x: 5 }}
              >
                View all <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
            </motion.div>
          </div>
        </Section>

        {/* Section 3: Participants */}
        <Section innerRef={participantsRef} className="bg-gray-50">
          <div className="w-full max-w-6xl mx-auto px-4 py-16">
            <motion.h2
              className="text-3xl font-bold mb-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Participants
            </motion.h2>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {outing.participants && outing.participants.length > 0 ? (
                outing.participants.map((participant, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex items-center space-x-4">
                        <div className="bg-gray-200 rounded-full p-3">
                          <Users className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{participant}</h4>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="col-span-full text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 text-lg">No participants have joined yet.</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default OutingDisplay;


