import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronRight, Users, Award, MapPin, MessageCircle, Check } from "lucide-react";
import { Link } from "react-router-dom";

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

const fadeInLeft = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const fadeInRight = {
  initial: {
    opacity: 0,
    x: -50,
  },
  animate: {
    opacity: 1,
    x: 0,
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

const CounterAnimation = ({ target, duration = 2.5, textColor = "text-white", icon: Icon }) => {
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
    <motion.div
      className="flex flex-col items-center"
      initial="initial"
      animate={controls}
      variants={fadeInUp}
    >
      {Icon && (
        <div className="mb-4 p-4 bg-white/10 rounded-full">
          <Icon className="w-8 h-8 text-white" />
        </div>
      )}
      <motion.h3 
        ref={nodeRef}
        className={`text-5xl font-bold ${textColor}`}
      >
        {count}+
      </motion.h3>
    </motion.div>
  );
};

export const AboutUs = () => {
  return (
    <div className="pt-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Hero Section with Background Design Element */}
      <div className="relative">
        <div className="absolute top-0 right-0 w-1/3 h-96 bg-black/5 rounded-bl-full -z-10"></div>
        <div className="absolute bottom-40 left-0 w-64 h-64 bg-black/5 rounded-full -z-10"></div>
      
        <div className="container mx-auto px-4">
          {/* About Section with Enhanced Design */}
          <motion.section 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col md:flex-row items-center justify-between gap-12 mb-32 pt-16"
          >
            <motion.div
              variants={fadeInRight}
              className="flex-1 max-w-2xl"
            >
              <div className="inline-block mb-4 px-4 py-1 bg-black/5 rounded-full">
                <span className="text-sm font-semibold tracking-wider text-gray-700">DISCOVER OUR STORY</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                We bring adventures to <span className="relative inline-block">
                  <span className="relative z-10">life</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-yellow-300/40 -z-10"></span>
                </span>
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Welcome to <strong className="font-bold text-black">Travellicious</strong>, where every journey becomes a story worth telling. We craft unforgettable experiences that connect you with nature, adventure, and like-minded explorers.
              </p>
              <motion.div
                variants={fadeInUp}
                className="mt-8"
              >
                <Link to="/contactus" className="group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <span>Learn more about us</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              variants={fadeInLeft}
              className="flex-1 relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dt9apeyvy/image/upload/v1742319507/aboutus_sbtja3.jpg"
                  alt="About Us"
                  className="w-full rounded-2xl shadow-xl object-cover"
                />
                <div className="absolute -bottom-8 -left-8 p-6 bg-white rounded-xl shadow-lg max-w-xs">
                  <p className="text-lg font-medium text-gray-900">
                    "Our mission is to provide unforgettable experiences that connect people with nature."
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* Call to Action Button */}
          <motion.div
            className="flex justify-center items-center mb-32"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <motion.a
              href="/premium"
              className="inline-block bg-black text-white px-12 py-5 rounded-full font-semibold shadow-md hover:bg-white hover:text-black hover:shadow-lg border-2 border-black transition-all duration-300 text-xl"
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariant}
            >
              Checkout our rentals
            </motion.a>
          </motion.div>

          {/* Mission Section with Enhanced Design */}
          <motion.section 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row-reverse items-center justify-between gap-12 mb-32"
          >
            <motion.div
              variants={fadeInLeft}
              className="flex-1 max-w-2xl"
            >
              <div className="inline-block mb-4 px-4 py-1 bg-black/5 rounded-full">
                <span className="text-sm font-semibold tracking-wider text-gray-700">OUR MISSION</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Mission & Vision</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                At Travellicious, we believe that exploration isn't just about destinations—it's about discovering yourself. Our mission is to create experiences that inspire, challenge, and transform.
              </p>
              
              <div className="space-y-4">
                {[
                  "Provide safe, memorable adventures for every skill level",
                  "Promote sustainable tourism and environmental respect",
                  "Foster community and connection among travelers",
                  "Support local economies and cultural preservation"
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="mt-1 bg-black rounded-full p-1 flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-lg text-gray-700">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeInRight}
              className="flex-1 relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="aspect-[4/3] relative">
                <img
                  src="https://res.cloudinary.com/dt9apeyvy/image/upload/v1738653851/products/q4ytd1exs2nzuj2lkg7k.jpg"
                  alt="Our Mission"
                  className="w-full h-full object-cover rounded-2xl shadow-xl"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </motion.section>

          {/* Stats Section with Enhanced Design */}
          <motion.section
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="relative py-20 mb-32 rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-black"></div>
            <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dt9apeyvy/image/upload/v1742319593/achievement_lh3iqg.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
            
            <div className="relative z-10 container mx-auto px-4">
              <motion.div
                variants={fadeInUp}
                className="text-center mb-16"
              >
                <div className="inline-block mb-4 px-4 py-1 bg-white/10 rounded-full">
                  <span className="text-sm font-semibold tracking-wider text-white">OUR ACHIEVEMENTS</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Impact In Numbers</h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  We're proud of the experiences we've created and the community we've built over the years.
                </p>
              </motion.div>
              
              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
              >
                <motion.div variants={fadeInUp} className="text-center">
                  <CounterAnimation target={100} textColor="text-white" icon={MapPin} />
                  <p className="text-xl text-gray-300 mt-3 font-medium">Unique Destinations</p>
                </motion.div>
                
                <motion.div variants={fadeInUp} className="text-center">
                  <CounterAnimation target={20} textColor="text-white" icon={Award} />
                  <p className="text-xl text-gray-300 mt-3 font-medium">Trek Packages</p>
                </motion.div>
                
                <motion.div variants={fadeInUp} className="text-center">
                  <CounterAnimation target={5} textColor="text-white" icon={MessageCircle} />
                  <p className="text-xl text-gray-300 mt-3 font-medium">Years Experience</p>
                </motion.div>
                
                <motion.div variants={fadeInUp} className="text-center">
                  <CounterAnimation target={800} textColor="text-white" icon={Users} />
                  <p className="text-xl text-gray-300 mt-3 font-medium">Happy Customers</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          {/* Team Section with Enhanced Design */}
          <motion.section 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mb-32"
          >
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <div className="inline-block mb-4 px-4 py-1 bg-black/5 rounded-full">
                <span className="text-sm font-semibold tracking-wider text-gray-700">MEET THE TEAM</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">The People Behind Travellicious</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our passionate team of adventure lovers and travel experts.
              </p>
            </motion.div>
            
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
            >
              {/* Team Member 1 */}
              <motion.div 
                variants={fadeInUp}
                className="group"
                whileHover={{ y: -10 }}
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src="https://res.cloudinary.com/dt9apeyvy/image/upload/v1742319807/Screenshot_2025-03-18_at_11.12.58_PM_h5ogzq.png"
                    alt="Chidanandha"
                    className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="bg-white pt-6 pb-8 px-6 rounded-b-2xl shadow-lg border border-gray-100 border-t-0 relative">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-1 rounded-full text-sm">
                    CEO & Founder
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 text-center mt-2">Chidanandha</h3>
                  <p className="text-gray-600 text-center mt-2">
                    Adventurer and visionary leading our journey to create meaningful experiences.
                  </p>
                </div>
              </motion.div>

              {/* Team Member 2 */}
              <motion.div 
                variants={fadeInUp}
                className="group"
                whileHover={{ y: -10 }}
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src="https://res.cloudinary.com/dt9apeyvy/image/upload/v1742318302/PXL_20240204_163349397.LONG_EXPOSURE-02.ORIGINAL_gkfxns.jpg"
                    alt="Donald Colin"
                    className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="bg-white pt-6 pb-8 px-6 rounded-b-2xl shadow-lg border border-gray-100 border-t-0 relative">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-1 rounded-full text-sm">
                    CTO & Developer
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 text-center mt-2">Donald Colin</h3>
                  <p className="text-gray-600 text-center mt-2">
                    Tech expert bringing digital innovation to enhance our adventure experiences.
                  </p>
                </div>
              </motion.div>

              {/* Team Member 3 */}
              <motion.div 
                variants={fadeInUp}
                className="group"
                whileHover={{ y: -10 }}
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src="https://res.cloudinary.com/dt9apeyvy/image/upload/v1742319153/max_ee6qse.jpg"
                    alt="MAX"
                    className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="bg-white pt-6 pb-8 px-6 rounded-b-2xl shadow-lg border border-gray-100 border-t-0 relative">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-1 rounded-full text-sm">
                    Operations Lead
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 text-center mt-2">Dhanajay</h3>
                  <p className="text-gray-600 text-center mt-2">
                    Operations expert ensuring every adventure runs smoothly and exceeds expectations.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* FAQ Section with Enhanced Design */}
          <motion.section 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mb-32"
          >
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <div className="inline-block mb-4 px-4 py-1 bg-black/5 rounded-full">
                <span className="text-sm font-semibold tracking-wider text-gray-700">COMMON QUESTIONS</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
                Everything you need to know before embarking on your journey with us.
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <Accordion type="single" collapsible className="divide-y">
                <AccordionItem value="item-1" className="border-0">
                  <AccordionTrigger className="px-8 py-6 hover:bg-gray-50 transition-all duration-200 text-lg font-medium text-left">
                    Is prior trekking experience required?
                  </AccordionTrigger>
                  <AccordionContent className="px-8 py-6 text-gray-700 text-lg bg-gray-50/50">
                    Not for all our adventures! We offer treks suitable for all experience levels, from beginners to advanced trekkers. Each journey is clearly marked with a difficulty level to help you choose the right experience.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2" className="border-0">
                  <AccordionTrigger className="px-8 py-6 hover:bg-gray-50 transition-all duration-200 text-lg font-medium text-left">
                    How do I book a trek?
                  </AccordionTrigger>
                  <AccordionContent className="px-8 py-6 text-gray-700 text-lg bg-gray-50/50">
                    You can book a trek directly through our website by selecting your desired experience and following the booking process. For custom experiences or group bookings, you can also contact our customer service team.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3" className="border-0">
                  <AccordionTrigger className="px-8 py-6 hover:bg-gray-50 transition-all duration-200 text-lg font-medium text-left">
                    What equipment do I need?
                  </AccordionTrigger>
                  <AccordionContent className="px-8 py-6 text-gray-700 text-lg bg-gray-50/50">
                    We provide a detailed equipment list for each trek. Basic requirements include proper hiking boots, weather-appropriate clothing, and a daypack. For certain adventures, we offer equipment rental options for specialized gear.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4" className="border-0">
                  <AccordionTrigger className="px-8 py-6 hover:bg-gray-50 transition-all duration-200 text-lg font-medium text-left">
                    Can I get a refund if I need to cancel?
                  </AccordionTrigger>
                  <AccordionContent className="px-8 py-6 text-gray-700 text-lg bg-gray-50/50">
                    Yes, we have a flexible cancellation policy. Full refunds are available for cancellations made 14 days or more before the scheduled trek. Partial refunds are available for cancellations between 7-13 days. Unfortunately, we cannot offer refunds for cancellations less than 7 days before the event.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </motion.section>
          
          {/* Call to Action */}
          <motion.section
            initial="initial"
            whileInView="animate"
            variants={fadeInUp}
            viewport={{ once: true }}
            className="mb-24 bg-black rounded-2xl py-16 px-8 md:px-16 text-center relative overflow-hidden"
          >
            <div className="absolute w-64 h-64 bg-white/5 rounded-full -top-20 -right-20"></div>
            <div className="absolute w-64 h-64 bg-white/5 rounded-full -bottom-20 -left-20"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">Ready to Start Your Adventure?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto relative z-10">
              Join us on a journey of discovery, challenge, and unforgettable moments.
            </p>
            <motion.a
              href="/contactus"
              className="inline-block bg-white text-black px-10 py-4 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition-all duration-300 text-lg relative z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Us Today
            </motion.a>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;