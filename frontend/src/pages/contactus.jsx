import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, AlertCircle, CheckCircle2, Facebook, Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { email, phone } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    if (!phoneRegex.test(phone)) {
      return "Please enter a valid 10-digit phone number.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form. Please try again later.");
      }

      setMessage("Thanks! We will call you shortly.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-64 bg-black/5 rounded-bl-full -z-10"></div>
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-black/5 rounded-full -z-10"></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-4 py-1 bg-black/5 rounded-full">
            <span className="text-sm font-semibold tracking-wider text-gray-700">GET IN TOUCH</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Contact Travellicious
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our adventures or need custom travel arrangements?
            Our team is here to help make your journey unforgettable.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto"
        >
          {/* Contact Form - Wider */}
          <motion.div variants={fadeIn} className="lg:col-span-3">
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="bg-black text-white py-6 px-8">
                <h2 className="text-xl font-semibold">Send Us a Message</h2>
                <p className="text-gray-300 text-sm mt-1">We'll get back to you within 24 hours</p>
              </div>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Your Name
                      </label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full transition-all duration-200 focus:ring-2 focus:ring-black/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="10-digit mobile number"
                        className="w-full transition-all duration-200 focus:ring-2 focus:ring-black/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full transition-all duration-200 focus:ring-2 focus:ring-black/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Your Message (Optional)
                    </label>
                    <Textarea
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your travel plans or questions"
                      className="w-full min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-black/20"
                    />
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-md"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p>{error}</p>
                    </motion.div>
                  )}

                  {message && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-md"
                    >
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <p>{message}</p>
                    </motion.div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-black hover:bg-gray-800 text-white py-3 h-auto text-base"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Company Info and Map - Narrower */}
          <motion.div variants={fadeIn} className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="bg-black text-white py-6 px-8">
                <h2 className="text-xl font-semibold">Contact Information</h2>
                <p className="text-gray-300 text-sm mt-1">Ways to reach us directly</p>
              </div>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-black/5 p-3 rounded-full">
                      <MapPin className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Our Office</p>
                      <p className="text-gray-600 mt-1">Travellicious Adventures</p>
                      <p className="text-gray-600">HSR Layout, Bengaluru,</p>
                      <p className="text-gray-600">Karnataka 560102, India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-black/5 p-3 rounded-full">
                      <Phone className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600 mt-1">+91 9876543210</p>
                      <p className="text-gray-600">Mon-Fri from 9am to 6pm</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-black/5 p-3 rounded-full">
                      <Mail className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600 mt-1">contact@travellicious.com</p>
                      <p className="text-gray-600">support@travellicious.com</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <p className="font-medium text-gray-900 mb-3">Connect With Us</p>
                    <div className="flex gap-4">
                      <a href="#" className="bg-black/5 p-3 rounded-full hover:bg-black/10 transition-colors duration-200">
                        <Facebook className="w-5 h-5 text-black" />
                      </a>
                      <a href="#" className="bg-black/5 p-3 rounded-full hover:bg-black/10 transition-colors duration-200">
                        <Instagram className="w-5 h-5 text-black" />
                      </a>
                      <a href="#" className="bg-black/5 p-3 rounded-full hover:bg-black/10 transition-colors duration-200">
                        <Twitter className="w-5 h-5 text-black" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="rounded-lg overflow-hidden shadow-lg h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15555.606729701392!2d77.62442139205098!3d12.914602994511633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1491bfdc6ecd%3A0xe93e03d1a531116c!2sHSR%20Layout%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700210000000!5m2!1sen!2sin"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Company Location"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
        
        {/* FAQ or Getting Here Section */}
        <motion.div 
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mt-20 max-w-6xl mx-auto bg-black text-white rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Visit Our Office</h2>
            <p className="text-gray-300 mb-8 max-w-3xl">
              Want to discuss your adventure in person? Our office is located in the heart of HSR Layout, 
              Bengaluru. We're easily accessible by public transport and have parking available for visitors.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-medium mb-2">By Car</h3>
                <p className="text-gray-300">Parking available at our building complex. Use the visitor's section.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">By Metro</h3>
                <p className="text-gray-300">HSR Layout station is a 10-minute walk from our office.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Office Hours</h3>
                <p className="text-gray-300">Monday to Friday: 9am - 6pm<br />Saturday: 10am - 2pm</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;