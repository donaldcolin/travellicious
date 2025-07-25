import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    id: Math.floor(Math.random() * 1000), // Generate a random ID
    name: "",
    category: "trek", // Default category
    location: "",
    distanceFromBangalore: "",
    nextdate: new Date(),
    availabledates: [],
    duration: "",
    altitude: "",
    dificulty: "",
    description: "",
    bigDescription: "",
    images: [],
    attractions: [""],
    services: {
      meals: "",
      returnTiming: "",
      groupSize: "",
      transport: "",
      pickupDrop: "",
    },
    price: {
      single: "",
      package: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("services.")) {
      const serviceKey = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        services: { ...prev.services, [serviceKey]: value },
      }));
    } else if (name.startsWith("price.")) {
      const priceKey = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        price: { ...prev.price, [priceKey]: Number(value) }, // Convert to number
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAttractionsChange = (index, value) => {
    const updatedAttractions = [...formData.attractions];
    updatedAttractions[index] = value;
    setFormData(prev => ({
      ...prev,
      attractions: updatedAttractions,
    }));
  };

  const addAttractionField = () => {
    setFormData(prev => ({
      ...prev,
      attractions: [...prev.attractions, ""],
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 5) {
      alert("You can upload up to 5 images only.");
      return;
    }
    const filesArray = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...filesArray],
    }));
  };

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_BASE = import.meta.env.VITE_API_BASE;
  const addProduct = async () => {
    try {
      // First upload images
      const formdata = new FormData();
      formData.images.forEach((file) => {
        formdata.append("product", file);
      });

      // Log the API URL for debugging
      console.log('Upload URL:', `${API_BASE}/upload`);

      const uploadResponse = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formdata,
      });

      // Log the response status and headers
      console.log('Upload Response Status:', uploadResponse.status);
      console.log('Upload Response Headers:', uploadResponse.headers);

      // Check if response is JSON
      const contentType = uploadResponse.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await uploadResponse.text();
        console.error('Non-JSON response:', text);
        throw new Error(`Expected JSON response but got ${contentType}`);
      }

      const uploadData = await uploadResponse.json();

      if (!uploadData.success) {
        throw new Error(uploadData.message || "Image upload failed");
      }

      // Prepare product data
      const productData = {
        ...formData,
        images: uploadData.image_urls,
        price: {
          single: Number(formData.price.single),
          package: Number(formData.price.package),
        },
        nextdate: formData.nextdate.toISOString(),
        availabledates: formData.availabledates.map(date => date.toISOString()),
      };

      // Log the product data for debugging
      console.log('Product Data:', productData);

      // Add product
      const addProductResponse = await fetch(`${API_BASE_URL}/addproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      // Check if response is JSON
      const productContentType = addProductResponse.headers.get("content-type");
      if (!productContentType || !productContentType.includes("application/json")) {
        const text = await addProductResponse.text();
        console.error('Non-JSON response:', text);
        throw new Error(`Expected JSON response but got ${productContentType}`);
      }

      const addProductData = await addProductResponse.json();

      if (addProductData.success) {
        alert("Product added successfully");
        // Reset form
        setFormData({
          id: Math.floor(Math.random() * 1000),
          name: "",
          category: "trek",
          location: "",
          distanceFromBangalore: "",
          nextdate: new Date(),
          availabledates: [],
          duration: "",
          altitude: "",
          dificulty: "",
          description: "",
          bigDescription: "",
          images: [],
          attractions: [""],
          services: {
            meals: "",
            returnTiming: "",
            groupSize: "",
            transport: "",
            pickupDrop: "",
          },
          price: {
            single: "",
            package: "",
          },
        });
      } else {
        throw new Error(addProductData.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert(error.message || "Something went wrong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Next Available Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.nextdate ? format(formData.nextdate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.nextdate}
                      onSelect={(date) => setFormData(prev => ({ ...prev, nextdate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Available Dates</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.availabledates.length > 0 
                        ? `${formData.availabledates.length} dates selected`
                        : "Select dates"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="multiple"
                      selected={formData.availabledates}
                      onSelect={(dates) => setFormData(prev => ({ ...prev, availabledates: dates }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <Input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Difficulty</label>
                <Input
                  type="text"
                  name="dificulty"
                  value={formData.dificulty}
                  onChange={handleChange}
                  placeholder="Enter difficulty level"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Altitude</label>
                <Input
                  type="text"
                  name="altitude"
                  value={formData.altitude}
                  onChange={handleChange}
                  placeholder="Enter altitude"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Distance From Bangalore</label>
                <Input
                  type="text"
                  name="distanceFromBangalore"
                  value={formData.distanceFromBangalore}
                  onChange={handleChange}
                  placeholder="Enter distance"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Duration</label>
                <Input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Enter duration"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Detailed Description</label>
                <Textarea
                  name="bigDescription"
                  value={formData.bigDescription}
                  onChange={handleChange}
                  placeholder="Enter detailed description"
                  className="h-32"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Attractions</label>
                <div className="space-y-2">
                  {formData.attractions.map((attraction, index) => (
                    <Input
                      key={index}
                      type="text"
                      value={attraction}
                      onChange={(e) => handleAttractionsChange(index, e.target.value)}
                      placeholder="Enter an attraction"
                      required
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addAttractionField}
                    className="w-full"
                  >
                    Add Attraction
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Images</label>
                <Input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept="image/*"
                  className="cursor-pointer"
                  required
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Services</h3>
                {Object.entries(formData.services).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <Input
                      type="text"
                      name={`services.${key}`}
                      value={value}
                      onChange={handleChange}
                      placeholder={`Enter ${key.toLowerCase().replace(/([A-Z])/g, ' $1').trim()}`}
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Price</h3>
                {Object.entries(formData.price).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1 capitalize">
                      {key} Price
                    </label>
                    <Input
                      type="number"
                      name={`price.${key}`}
                      value={value}
                      onChange={handleChange}
                      placeholder={`Enter ${key} price`}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;