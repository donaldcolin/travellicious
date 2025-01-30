import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "Trek",
    location: "",
    distanceFromBangalore: "",
    nextdate: "",
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/allproducts/${id}`);
        setProduct(response.data);
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
      await axios.put(`http://localhost:4000/updateproduct/${id}`, product);
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
    <div className="container mx-auto px-4 py-8 pl-[20%] bg-gray-50">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Edit Product</h2>
      {submitError && <div className="text-red-500 mb-4">{submitError}</div>}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-200"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            <option value="Trek">Trek</option>
            <option value="Outing">Outing</option>
          </select>
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={product.location}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Distance From Bangalore
          </label>
          <input
            type="text"
            name="distanceFromBangalore"
            value={product.distanceFromBangalore}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Next Available Date
          </label>
          <input
            type="date"
            name="nextdate"
            value={product.nextdate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Dates
          </label>
          <input
            type="text"
            name="availabledates"
            value={product.availabledates.join(", ")}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                availabledates: e.target.value.split(", "),
              }))
            }
            className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration
          </label>
          <input
            type="text"
            name="duration"
            value={product.duration}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Detailed Description
          </label>
          <textarea
            name="bigDescription"
            value={product.bigDescription}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Attractions
          </label>
          {product.attractions.map((attraction, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                value={attraction}
                onChange={(e) => handleAttractionsChange(index, e.target.value)}
                className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring focus:ring-indigo-300"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addAttractionField}
            className="mt-2 text-sm text-indigo-600 hover:underline"
          >
            Add Attraction
          </button>
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Services
          </label>
          {Object.entries(product.services).map(([key, value]) => (
            <div key={key} className="mb-2">
              <label className="block text-sm font-medium text-gray-600 capitalize">
                {key}
              </label>
              <input
                type="text"
                name={`services.${key}`}
                value={value}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring focus:ring-indigo-300"
              />
            </div>
          ))}
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price
          </label>
          {Object.entries(product.price).map(([key, value]) => (
            <div key={key} className="mb-2">
              <label className="block text-sm font-medium text-gray-600 capitalize">
                {key}
              </label>
              <input
                type="number"
                name={`price.${key}`}
                value={value}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring focus:ring-indigo-300"
              />
            </div>
          ))}
        </div>
  
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
        >
          Update Product
        </button>
      </form>
    </div>
  );
  
};

export default EditProduct;