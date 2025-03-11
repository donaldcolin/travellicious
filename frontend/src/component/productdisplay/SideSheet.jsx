import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button.jsx";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "../../components/ui/sheet.tsx";
import { Input } from "../../components/ui/input.tsx";
import { Label } from "../../components/ui/label.tsx";
import { Alert, AlertTitle, AlertDescription } from "../../components/ui/alert.tsx";
import { Check, AlertCircle, Calendar, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ContactSideSheet = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    try {
      setError(null);
      setMessage(null);

      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form. Please try again later.");
      }

      setMessage("Thanks! We will contact you shortly.");
      setFormData({ name: "", email: "", phone: "", date: "" });
      setTimeout(() => setIsOpen(false), 2000); // Close sheet after success
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.width = '100%';
      body.style.height = '100%';
    } else {
      body.style.overflow = 'auto';
      body.style.position = '';
      body.style.width = '';
      body.style.height = '';
    }

    // Reset form fields when the sheet is closed
    if (!isOpen) {
      setFormData({ name: "", email: "", phone: "", date: "" });
      setError(null);
      setMessage(null);
    }
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen} className="fixed inset-0 z-50">
      <SheetTrigger asChild>
        <div className="flex justify-center items-center">
          <Button className="w-full py-4 bg-black text-white hover:bg-gray-800 rounded-lg font-medium">
            Book Trek Now
          </Button>
        </div>
      </SheetTrigger>

      {/* Background Blur */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />
      )}

      {/* Side Sheet Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 w-3/4 md:w-1/2 h-full bg-white shadow-lg rounded-t-2xl md:rounded-none overflow-hidden z-50"
          >
            <div className="h-full flex flex-col">
              <SheetHeader className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <SheetTitle className="text-2xl font-bold text-gray-900">
                    Contact Us
                  </SheetTitle>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <SheetDescription className="text-center text-sm text-gray-600 mt-2">
                  Fill out the form below to book your trek.
                </SheetDescription>
              </SheetHeader>

              <form onSubmit={handleSubmit} className="flex-grow p-6 space-y-6 overflow-y-auto">
                {/* Form Fields */}
                <div className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="mt-2 w-full"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="mt-2 w-full"
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                      className="mt-2 w-full"
                    />
                  </div>

                  {/* Date Selector */}
                  <div>
                    <Label htmlFor="date" className="text-sm font-medium">
                      Select Trek Date
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={today}
                        required
                        className="pl-10 w-full"
                      />
                      <Calendar className="absolute top-3 left-3 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-gray-800 font-semibold py-3 rounded-lg transition-all"
                >
                  Submit
                </Button>

                {/* Error Alert */}
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Success Alert */}
                {message && (
                  <Alert className="bg-green-50 border-green-500">
                    <Check className="h-5 w-5 text-green-600" />
                    <AlertTitle className="text-green-600">Success</AlertTitle>
                    <AlertDescription className="text-green-600">{message}</AlertDescription>
                  </Alert>
                )}
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Sheet>
  );
};

export default ContactSideSheet;