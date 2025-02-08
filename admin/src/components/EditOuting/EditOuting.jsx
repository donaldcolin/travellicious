import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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

const EditOuting = () => {
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
    availabledates: [],
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

  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOutingData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/alloutings/${id}`);
        // Convert date strings to Date objects
        const outingData = {
          ...response.data,
          nextDate: new Date(response.data.nextDate),
          availabledates: response.data.availabledates.map(date => new Date(date)),
        };
        setFormData(outingData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching outing:", error);
        setLoading(false);
      }
    };
    fetchOutingData();
  }, [id]);

  // Handle date changes
  const handleDateChange = (date, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("inclusions.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        inclusions: { ...prev.inclusions, [key]: value },
      }));
    } else if (name.startsWith("contact.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const updateOuting = async () => {
    try {
      // Convert Date objects to ISO strings before sending
      const dataToSend = {
        ...formData,
        nextDate: formData.nextDate.toISOString(),
        availabledates: formData.availabledates.map(date => date.toISOString()),
      };

      const response = await axios.put(
        `http://localhost:4000/updateOuting/${id}`,
        dataToSend
      );
      
      if (response.data.success) {
        alert("Outing updated successfully!");
        navigate("/outings");
      } else {
        alert("Failed to update outing");
      }
    } catch (error) {
      console.error("Error updating outing:", error);
      alert("Something went wrong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateOuting();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 pl-[20%]">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit Outing</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div>
              <label className="block text-sm font-medium mb-1">Next Available Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.nextDate ? format(formData.nextDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.nextDate}
                    onSelect={(date) =>
                      setFormData((prev) => ({ ...prev, nextDate: date }))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
 {/* Next Available Date Calendar */}
 <div>
              <label className="block text-sm font-medium mb-1">Next Available Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.nextDate ? format(formData.nextDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.nextDate}
                    onSelect={(date) => handleDateChange(date, "nextDate")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Available Dates Calendar */}
            <div>
              <label className="block text-sm font-medium mb-1">Available Dates</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
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
                    onSelect={(dates) => handleDateChange(dates, "availabledates")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            

            <div>
              <label className="block text-sm font-medium mb-1">Distance from Bangalore</label>
              <Input
                type="text"
                name="distanceFromBangalore"
                value={formData.distanceFromBangalore}
                onChange={handleChange}
                placeholder="Enter distance from Bangalore"
                required
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium mb-1">Big Description</label>
              <Textarea
                name="bigDescription"
                value={formData.bigDescription}
                onChange={handleChange}
                placeholder="Enter a detailed description"
              />
            </div>

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
                    placeholder="Enter meal details (e.g., Breakfast, Lunch)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Transport</label>
                  <Input
                    type="text"
                    name="inclusions.transport"
                    value={formData.inclusions.transport}
                    onChange={handleChange}
                    placeholder="Enter transport details (e.g., Bus, Train)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Accommodation</label>
                  <Input
                    type="text"
                    name="inclusions.accommodation"
                    value={formData.inclusions.accommodation}
                    onChange={handleChange}
                    placeholder="Enter accommodation details (e.g., Hotel, Campsite)"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Organizer Name</label>
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
              <label className="block text-sm font-medium mb-1">Organizer Email</label>
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
              <label className="block text-sm font-medium mb-1">Organizer Phone</label>
              <Input
                type="text"
                name="contact.organizerPhone"
                value={formData.contact.organizerPhone}
                onChange={handleChange}
                placeholder="Enter organizer's phone number"
                required
              />
            </div>

            <div>
              <Button type="submit" className="w-full">
                Update Outing
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditOuting;