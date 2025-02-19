import  { useState } from "react";
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

    location: "",
    distanceFromBangalore: "",
    duration: "",
    maxParticipants: "",
    pricePerPerson: "",
    description: "",
    bigDescription: "",
    nextDate: new Date(),
    availabledates: [], // Array of dates
    images: [],
    inclusions: {
      meals: "",
      transport: "",
      accommodation: "",
    },
    contact: {
      organizerName: "",
      organizerEmail: "",
      organizerPhone: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("inclusions.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        inclusions: { ...prev.inclusions, [key]: value }, // Keep as string, remove "true"/"false" logic
      }));
    }  else if (name.startsWith("contact.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
          
            location: "",
            distanceFromBangalore: "",
            duration: "",
            maxParticipants: "",
            pricePerPerson: "",
            description: "",
            bigDescription: "",
            nextDate: new Date(),
            availabledates: [], // Array of dates
            images: [],
            inclusions: {
              meals: "",
              transport: "",
              accommodation: "",
            },
            contact: {
              organizerName: "",
              organizerEmail: "",
              organizerPhone: "",
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
            {/*datess*/}
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

            {/* Distance from Bangalore */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Distance from Bangalore
              </label>
              <Input
                type="text"
                name="distanceFromBangalore"
                value={formData.distanceFromBangalore}
                onChange={handleChange}
                placeholder="Enter distance from Bangalore"
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

            {/* Big Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Big Description
              </label>
              <Textarea
                name="bigDescription"
                value={formData.bigDescription}
                onChange={handleChange}
                placeholder="Enter a detailed description"
              />
            </div>
             {/* Inclusions */}
            <div>
              <label className="block text-sm font-medium mb-1">Inclusions</label>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Meals</label>
                  <Input
                    type="text"
                    name="inclusions.meals"
                    value={formData.inclusions.meals}
                    onChange={handleChange}
                    placeholder="Enter meal details"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Transport</label>
                  <Input
                    type="text"
                    name="inclusions.transport"
                    value={formData.inclusions.transport}
                    onChange={handleChange}
                    placeholder="Enter transport details"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Accommodation</label>
                  <Input
                    type="text"
                    name="inclusions.accommodation"
                    value={formData.inclusions.accommodation}
                    onChange={handleChange}
                    placeholder="Enter accommodation details"
                  />
                </div>
              </div>
            </div>



            {/* Contact Details */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Organizer Name
              </label>
              <Input
                type="text"
                name="contact.organizerName"
                value={formData.contact.organizerName}
                onChange={handleChange}
                placeholder="Enter organizer's name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Organizer Email
              </label>
              <Input
                type="email"
                name="contact.organizerEmail"
                value={formData.contact.organizerEmail}
                onChange={handleChange}
                placeholder="Enter organizer's email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Organizer Phone
              </label>
              <Input
                type="text"
                name="contact.organizerPhone"
                value={formData.contact.organizerPhone}
                onChange={handleChange}
                placeholder="Enter organizer's phone number"
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