import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      ease: "easeInOut",
    },
  },
};

export const AboutUs = () => {
  return (
    <div className="pt-28">
      <div className="container mx-auto px-4">
        {/* About Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex-1"
          >
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-lg text-gray-600">
              Welcome to <strong className="font-bold">Travellicious</strong>. We are dedicated to delivering the best products and services tailored to our customers' needs. Our team believes in innovation, integrity, and excellence, and we strive to create a lasting impact in the industry.
            </p>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex-1"
          >
            <img
              src="https://placehold.co/400"
              alt="About Us"
              className="w-full rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out"
            />
          </motion.div>
        </section>

        {/* Mission Section */}
        <section className="flex flex-col md:flex-row-reverse items-center justify-between gap-8 mb-16">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex-1"
          >
            <img
              src="https://placehold.co/400"
              alt="Our Mission"
              className="w-full rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out"
            />
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600">
              Our mission is to create value for our customers by providing innovative solutions and building long-term relationships. We aim to empower businesses and individuals to achieve their goals through our products and services.
            </p>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="flex justify-center gap-8"
            >
              <div className="text-center">
                <h3 className="text-4xl font-bold">50+</h3>
                <p className="text-lg text-gray-600">Total Treks Conducted</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold">600+</h3>
                <p className="text-lg text-gray-600">Happy Customers</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-8"
          >
            Meet Our Team
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-center gap-8"
          >
            {/* Team Member 1 */}
            <div className="flex md:flex-row-reverse items-center gap-4">
              <img
                src="https://placehold.co/400"
                alt="Chidanandha"
                className="w-32 h-32 rounded-full shadow-lg hover:scale-105 transition duration-300 ease-in-out"
              />
              <div>
                <h3 className="text-2xl font-bold">Chidanandha</h3>
                <p className="text-lg text-gray-600">CEO</p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-2xl font-bold">Donald Colin</h3>
                <p className="text-lg text-gray-600">CTO & Web Developer</p>
              </div>
              <img
                src="https://placehold.co/400"
                alt="Donald Colin"
                className="w-32 h-32 rounded-full shadow-lg hover:scale-105 transition duration-300 ease-in-out"
              />
            </div>

            {/* Team Member 3 */}
            <div className="flex md:flex-row-reverse items-center gap-4">
              <img
                src="https://placehold.co/400"
                alt="Emily Brown"
                className="w-32 h-32 rounded-full shadow-lg hover:scale-105 transition duration-300 ease-in-out"
              />
              <div>
                <h3 className="text-2xl font-bold">Random member</h3>
                <p className="text-lg text-gray-600">Business operations</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <motion.h2
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-12"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <Accordion type="single" collapsible className="space-y-0">
                  <AccordionItem value="item-1" className="border-b">
                    <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-all duration-200 text-lg font-medium">
                      Is it accessible?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 text-gray-600">
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2" className="border-b">
                    <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-all duration-200 text-lg font-medium">
                      How do I book a trek?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 text-gray-600">
                      You can book a trek through our website or by contacting our customer service team.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-all duration-200 text-lg font-medium">
                      What equipment do I need?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 text-gray-600">
                      We provide a detailed equipment list for each trek. Basic requirements include proper hiking boots, 
                      weather-appropriate clothing, and a daypack.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;