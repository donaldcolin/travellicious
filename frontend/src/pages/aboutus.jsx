import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Enhanced animation variants
const fadeInUp = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const buttonVariant = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    }
  },
  tap: { scale: 0.98 }
};

const CounterAnimation = ({ target, duration = 2.5, textColor = "text-white" }) => {
  const nodeRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(nodeRef, { once: true, threshold: 0.3 });
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        controls.start("animate");
        
        const startTime = Date.now();
        const interval = setInterval(() => {
          const elapsedTime = Date.now() - startTime;
          const progress = Math.min(elapsedTime / (duration * 1000), 1);
          setCount(Math.floor(target * progress));
          
          if (progress === 1) {
            clearInterval(interval);
          }
        }, 30);
        
        return () => clearInterval(interval);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, target, duration, controls]);
  
  return (
    <motion.h3 
      ref={nodeRef}
      className={`text-5xl font-bold ${textColor}`}
      initial="initial"
      animate={controls}
      variants={fadeInUp}
    >
      {count}+
    </motion.h3>
  );
};

export const AboutUs = () => {
  return (
    <div className="pt-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* About Section with Centered Button */}
        <motion.section 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24"
        >
          <motion.div
            variants={fadeInUp}
            className="flex-1"
          >
            <h1 className="text-5xl font-bold mb-6 text-gray-900">About Us</h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Welcome to <strong className="font-bold text-indigo-600">Travellicious</strong>. We are dedicated to delivering the best products and services tailored to our customers' needs. Our team believes in innovation, integrity, and excellence, and we strive to create a lasting impact in the industry.
            </p>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="flex-1 relative"
            whileHover={{ scale: 1.03, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src="https://placehold.co/600x400"
              alt="About Us"
              className="w-full rounded-xl shadow-xl object-cover"
            />
          </motion.div>
        </motion.section>

        {/* Centered Button Section */}
        <motion.div
          className="flex justify-center items-center mb-24"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.a
            href="/premium"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white px-12 py-5 rounded-full font-semibold shadow-md hover:bg-white hover:text-black hover:shadow-lg border-2 border-black transition-all duration-300 text-xl"
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariant}
          >
            Checkout our rentals
          </motion.a>
        </motion.div>

        {/* Mission Section */}
        <motion.section 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row-reverse items-center justify-between gap-12 mb-24"
        >
          <motion.div
            variants={fadeInUp}
            className="flex-1"
            whileHover={{ scale: 1.03, rotate: -1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src="https://placehold.co/600x400"
              alt="Our Mission"
              className="w-full rounded-xl shadow-xl object-cover"
            />
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="flex-1"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Our mission is to create value for our customers by providing innovative solutions and building long-term relationships. We aim to empower businesses and individuals to achieve their goals through our products and services.
            </p>
          </motion.div>
        </motion.section>

        {/* Stats Section with Counter Animation for Both Stats */}
        <motion.section 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-900 to-black py-20 rounded-2xl shadow-xl mb-24"
        >
          <div className="container mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              className="flex flex-col md:flex-row justify-center gap-16 items-center"
            >
              <motion.div 
                variants={fadeInUp}
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CounterAnimation target={50} textColor="text-white" />
                <p className="text-xl text-gray-300 mt-3 font-medium">Total Treks Conducted</p>
              </motion.div>
              <motion.div 
                variants={fadeInUp}
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CounterAnimation target={600} textColor="text-white" />
                <p className="text-xl text-gray-300 mt-3 font-medium">Happy Customers</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-24"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-16 text-gray-900"
          >
            Meet Our Team
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            className="flex flex-col md:flex-row justify-center gap-12"
          >
            {/* Team Member 1 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -10 }}
            >
              <div className="flex md:flex-row-reverse items-center gap-6">
                <motion.img
                  src="https://placehold.co/400"
                  alt="Chidanandha"
                  className="w-36 h-36 rounded-full shadow-lg object-cover border-4 border-indigo-100"
                  whileHover={{ scale: 1.1, borderColor: "rgba(79, 70, 229, 0.4)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Chidanandha</h3>
                  <p className="text-lg text-gray-600">CEO</p>
                </div>
              </div>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -10 }}
            >
              <div className="flex items-center gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Donald Colin</h3>
                  <p className="text-lg text-gray-600">CTO & Web Developer</p>
                </div>
                <motion.img
                  src="https://placehold.co/400"
                  alt="Donald Colin"
                  className="w-36 h-36 rounded-full shadow-lg object-cover border-4 border-indigo-100"
                  whileHover={{ scale: 1.1, borderColor: "rgba(79, 70, 229, 0.4)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -10 }}
            >
              <div className="flex md:flex-row-reverse items-center gap-6">
                <motion.img
                  src="https://placehold.co/400"
                  alt="Random member"
                  className="w-36 h-36 rounded-full shadow-lg object-cover border-4 border-indigo-100"
                  whileHover={{ scale: 1.1, borderColor: "rgba(79, 70, 229, 0.4)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Random member</h3>
                  <p className="text-lg text-gray-600">Business operations</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="bg-white py-20 rounded-2xl shadow-lg mb-16"
        >
          <div className="container mx-auto px-4">
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-center mb-12 text-gray-900"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white rounded-xl shadow-md border border-gray-100">
                <Accordion type="single" collapsible className="space-y-0">
                  <AccordionItem value="item-1" className="border-b">
                    <AccordionTrigger className="px-8 py-5 hover:bg-gray-50 transition-all duration-200 text-lg font-medium">
                      Is it accessible?
                    </AccordionTrigger>
                    <AccordionContent className="px-8 py-5 text-gray-700 text-lg">
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2" className="border-b">
                    <AccordionTrigger className="px-8 py-5 hover:bg-gray-50 transition-all duration-200 text-lg font-medium">
                      How do I book a trek?
                    </AccordionTrigger>
                    <AccordionContent className="px-8 py-5 text-gray-700 text-lg">
                      You can book a trek through our website or by contacting our customer service team.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="px-8 py-5 hover:bg-gray-50 transition-all duration-200 text-lg font-medium">
                      What equipment do I need?
                    </AccordionTrigger>
                    <AccordionContent className="px-8 py-5 text-gray-700 text-lg">
                      We provide a detailed equipment list for each trek. Basic requirements include proper hiking boots, 
                      weather-appropriate clothing, and a daypack.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutUs;