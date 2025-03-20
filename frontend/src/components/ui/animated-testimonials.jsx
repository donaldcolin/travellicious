import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const AnimatedTestimonials = ({ testimonials, autoplay = false }) => {
  const [active, setActive] = React.useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  return (
    <div className="max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-16">
      <div className="relative bg-white dark:bg-black rounded-none p-10 md:p-14 shadow-xl border-t border-b border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M40,-51.2C50.7,-43.5,57.3,-29.8,60.6,-15.7C63.9,-1.6,63.8,13,57.1,23.8C50.4,34.6,37.1,41.7,23.3,48.5C9.6,55.3,-4.7,61.8,-19.5,60.3C-34.3,58.8,-49.5,49.3,-58.8,35.4C-68.1,21.5,-71.5,3.3,-68.2,-13.1C-64.9,-29.5,-55,-44.1,-42,-53.3C-29,-62.5,-12.9,-66.3,1.3,-67.9C15.5,-69.5,31,-58.9,40,-51.2Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="flex flex-col items-center text-center min-h-[200px] relative z-10"
          >
            {/* Quote symbol */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-7xl text-black dark:text-white opacity-10 mb-4 font-serif"
            >
              "
            </motion.div>
            
            {/* Testimonial Quote */}
            <motion.p className="text-lg md:text-xl text-black dark:text-white mb-10 leading-relaxed max-w-2xl font-light tracking-wide">
              {testimonials[active].quote.split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
                  animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeInOut',
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
            
            {/* Name and Designation with avatar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-4 flex flex-col items-center"
            >
              {testimonials[active].avatar && (
                <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200 dark:border-gray-800 mb-4 grayscale">
                  <img 
                    src={testimonials[active].avatar} 
                    alt={testimonials[active].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-wider">
                {testimonials[active].name}
              </h3>
              <div className="w-10 h-0.5 bg-black dark:bg-white my-3 opacity-20"></div>
              <p className="text-sm text-black dark:text-white opacity-60 mt-1 uppercase tracking-wider">
                {testimonials[active].designation}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Controls */}
        <div className="flex justify-between mt-12 px-8">
          <button
            onClick={handlePrev}
            className="group transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <div className="flex items-center gap-2">
              <ChevronLeft className="h-5 w-5 text-black dark:text-white opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="text-sm uppercase tracking-wider text-black dark:text-white opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-300">Prev</span>
            </div>
          </button>
          
          {/* Indicator dots */}
          <div className="flex items-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`transition-all duration-300 ${
                  index === active 
                    ? 'h-3 w-3 bg-black dark:bg-white rounded-full' 
                    : 'h-1.5 w-1.5 bg-black dark:bg-white opacity-20 rounded-full hover:opacity-40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={handleNext}
            className="group transition-all duration-300"
            aria-label="Next testimonial"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm uppercase tracking-wider text-black dark:text-white opacity-0 translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-300">Next</span>
              <ChevronRight className="h-5 w-5 text-black dark:text-white opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTestimonials;