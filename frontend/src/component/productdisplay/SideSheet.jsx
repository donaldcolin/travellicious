import React, { useState } from "react";
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
import { Check, AlertCircle } from "lucide-react";


const ContactSideSheet = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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

    try {
      setError(null);
      setMessage(null);

      const response = await fetch("http://localhost:4000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form. Please try again later.");
      }

      setMessage("Thanks! We will contact you shortly.");
      setFormData({ name: "", email: "", phone: "" });
      setTimeout(() => setIsOpen(false), 2000); // Close sheet after success
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
      <div className=" center items-center v-screen">
  <Button
    className="px-6 py-3 bg-white text-black text-lg font-semibold rounded-full border-2 border-black hover:bg-black hover:text-white focus:ring-2 focus:ring-black focus:outline-none transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
  >
    Book Trek Now
  </Button>
</div>
      </SheetTrigger>

      {/* Side Sheet Content */}
      <SheetContent
        className="top-14 right-0 bg-white transform translate-x-full transition-transform duration-700 "
        style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-gray-900">Contact Us</SheetTitle>
          <SheetDescription className="text-xl font-semibold text-gray-600">
            Fill out the form below and we'll get back to you as soon as possible.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {message && (
            <Alert className="bg-green-50">
              <Check className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-600">Success</AlertTitle>
              <AlertDescription className="text-green-600">{message}</AlertDescription>
            </Alert>
          )}

          
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default ContactSideSheet;