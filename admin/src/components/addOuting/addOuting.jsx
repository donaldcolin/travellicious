import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

const AddOuting = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "Trek",
    location: "",
    distanceFromBangalore: "",
    nextdate: new Date(),
    availabledates: [],
    duration: "",
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
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        services: { ...prev.services, [key]: value },
      }));
    } else if (name.startsWith("price.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        price: { ...prev.price, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAttractionsChange = (index, value) => {
    const updatedAttractions = [...formData.attractions];
    updatedAttractions[index] = value;
    setFormData((prev) => ({
      ...prev,
      attractions: updatedAttractions,
    }));
  };

  const addAttractionField = () => {
    setFormData((prev) => ({
      ...prev,
      attractions: [...prev.attractions, ""],
    }));
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    if (filesArray.length > 5) {
      alert("You can upload up to 5 images only.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: filesArray.map((file) => URL.createObjectURL(file)), // Temporary URLs for preview
    }));
  };

  const addOuting = async () => {
    const formdata = new FormData();
    formData.images.forEach((file) => formdata.append("product", file));

    try {
      const uploadResponse = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formdata,
      });
      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
        const outingData = {
          ...formData,
          images: uploadData.image_urls,
        };

        const response = await fetch("http://localhost:4000/addOuting", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(outingData),
        });

        const responseData = await response.json();
        if (responseData.success) {
          alert("Outing added successfully!");
          setFormData({
            name: "",
            category: "Trek",
            location: "",
            distanceFromBangalore: "",
            nextdate: new Date(),
            availabledates: [],
            duration: "",
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
          alert("Failed to add outing");
        }
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      console.error("Error adding outing:", error);
      alert("Something went wrong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOuting();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add Outing</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter outing name"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Trek">Trek</SelectItem>
                  <SelectItem value="Outing">Outing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Next Available Date */}
            <div>
              <label className="block text-sm font-medium mb-1">Next Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.nextdate
                      ? format(formData.nextdate, "PPP")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={formData.nextdate}
                    onSelect={(date) =>
                      setFormData((prev) => ({ ...prev, nextdate: date }))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter outing location"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a short description"
                required
              />
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium mb-1">Images</label>
              <Input
                type="file"
                multiple
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>

            <Button type="submit" className="w-full">
              Add Outing
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddOuting;