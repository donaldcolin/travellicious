import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

const EditProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "Trek",
    location: "",
    distanceFromBangalore: "",
    nextdate: new Date(),
    availabledates: [],
    duration: "",
    description: "",
    bigDescription: "",
    dificulty: "",
    altitude: "",
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/allproducts/${id}`);
        // Convert date strings to Date objects
        const productData = {
          ...response.data,
          nextdate: new Date(response.data.nextdate),
          availabledates: response.data.availabledates.map(date => new Date(date))
        };
        setProduct(productData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product details");
        setLoading(false);
        console.error("Error fetching product:", err);
      }
    };

    fetchProductData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("services.")) {
      const serviceKey = name.split(".")[1];
      setProduct((prev) => ({
        ...prev,
        services: { ...prev.services, [serviceKey]: value },
      }));
    } else if (name.startsWith("price.")) {
      const priceKey = name.split(".")[1];
      setProduct((prev) => ({
        ...prev,
        price: { ...prev.price, [priceKey]: value },
      }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAttractionsChange = (index, value) => {
    const updatedAttractions = [...product.attractions];
    updatedAttractions[index] = value;
    setProduct((prev) => ({
      ...prev,
      attractions: updatedAttractions,
    }));
  };

  const addAttractionField = () => {
    setProduct((prev) => ({
      ...prev,
      attractions: [...prev.attractions, ""],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    try {
      await axios.put(`${API_BASE_URL}/updateproduct/${id}`, product);
      navigate("/listproduct");
    } catch (err) {
      setSubmitError("Failed to update product");
      console.error("Error updating product:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {submitError && <div className="text-red-500 mb-4">{submitError}</div>}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Input
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Next Available Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {product.nextdate ? format(product.nextdate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={product.nextdate}
                      onSelect={(date) => setProduct(prev => ({ ...prev, nextdate: date }))}
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
                      {product.availabledates.length > 0 
                        ? `${product.availabledates.length} dates selected`
                        : "Select dates"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="multiple"
                      selected={product.availabledates}
                      onSelect={(dates) => setProduct(prev => ({ ...prev, availabledates: dates }))}
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
                  value={product.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Difficulty</label>
                <Input
                  type="text"
                  name="dificulty"
                  value={product.dificulty}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Altitude</label>
                <Input
                  type="text"
                  name="altitude"
                  value={product.altitude}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Distance From Bangalore</label>
                <Input
                  type="text"
                  name="distanceFromBangalore"
                  value={product.distanceFromBangalore}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Duration</label>
                <Input
                  type="text"
                  name="duration"
                  value={product.duration}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Detailed Description</label>
                <Textarea
                  name="bigDescription"
                  value={product.bigDescription}
                  onChange={handleChange}
                  className="h-32"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Attractions</label>
                <div className="space-y-2">
                  {product.attractions.map((attraction, index) => (
                    <Input
                      key={index}
                      type="text"
                      value={attraction}
                      onChange={(e) => handleAttractionsChange(index, e.target.value)}
                      placeholder="Enter an attraction"
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

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Services</h3>
                {Object.entries(product.services).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <Input
                      type="text"
                      name={`services.${key}`}
                      value={value}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Price</h3>
                {Object.entries(product.price).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1 capitalize">
                      {key} Price
                    </label>
                    <Input
                      type="number"
                      name={`price.${key}`}
                      value={value}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Update Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProduct;