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
import { Check, AlertCircle,Calendar } from "lucide-react";


const ContactSideSheet = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
  <Button className="px-6 py-3 bg-white text-black text-lg font-semibold rounded-full border-2 border-black hover:bg-black hover:text-white focus:ring-2 focus:ring-black focus:outline-none transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95">
    Book Trek Now
  </Button>
</div>
      </SheetTrigger>

      {/* Side Sheet Content */}
      <SheetContent
  className={`fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg transition-transform ease-in-out ${
    isOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <SheetHeader>
    <SheetTitle className="text-3xl font-bold text-gray-900">Contact Us</SheetTitle>
    <SheetDescription className="text-lg text-gray-600">
      Fill out the form below to book your trek.
    </SheetDescription>
  </SheetHeader>

  <form onSubmit={handleSubmit} className="space-y-6 mt-6">
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
          className="mt-1"
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
          className="mt-1"
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
          className="mt-1"
        />
      </div>

      {/* Date Selector */}
      <div>
        <Label htmlFor="date" className="text-sm font-medium">
          Select Trek Date
        </Label>
        <div className="relative mt-1">
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            min={today}
            required
            className="pl-10"
          />
          <Calendar className="absolute top-3 left-3 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>

    {/* Submit Button */}
    <Button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
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
</SheetContent>
      
    </Sheet>
  );
};

export default ContactSideSheet;