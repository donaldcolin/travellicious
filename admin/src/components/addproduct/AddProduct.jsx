import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "Trek",
    location: "",
    distanceFromBangalore: "",
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
      const serviceKey = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        services: {
          ...prevData.services,
          [serviceKey]: value,
        },
      }));
    } else if (name.startsWith("price.")) {
      const priceKey = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        price: {
          ...prevData.price,
          [priceKey]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAttractionsChange = (index, value) => {
    const updatedAttractions = [...formData.attractions];
    updatedAttractions[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      attractions: updatedAttractions,
    }));
  };

  const addAttractionField = () => {
    setFormData((prevData) => ({
      ...prevData,
      attractions: [...prevData.attractions, ""],
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 5) {
      alert("You can upload up to 5 images only.");
      return;
    }
    const filesArray = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...filesArray],
    }));
  };

  const addProduct = async () => {
    const formdata = new FormData();
    formData.images.forEach((file) => formdata.append("product", file));

    try {
      const uploadResponse = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formdata,
      });
      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
        const productData = {
          ...formData,
          images: uploadData.image_urls,
        };

        const addProductResponse = await fetch("http://localhost:4000/addproduct/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        });

        const addProductData = await addProductResponse.json();
        if (addProductData.success) {
          alert("Product added successfully");
          setFormData({
            name: "",
            category: "Trek",
            location: "",
            distanceFromBangalore: "",
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
          alert("Failed to add product");
        }
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Something went wrong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct();
  };

  return (
    <div className="add-product-container">
      <h1>Add Product</h1>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Trek">Trek</option>
            <option value="Outing">Outing</option>
          </select>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
          />
        </div>

        <div className="form-group">
          <label>Distance From Bangalore</label>
          <input
            type="text"
            name="distanceFromBangalore"
            value={formData.distanceFromBangalore}
            onChange={handleChange}
            placeholder="Enter distance"
            required
          />
        </div>

        <div className="form-group">
          <label>Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter duration"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            required
          />
        </div>

        <div className="form-group">
          <label>Big Description</label>
          <textarea
            name="bigDescription"
            value={formData.bigDescription}
            onChange={handleChange}
            placeholder="Enter detailed description"
          />
        </div>

        <div className="form-group">
          <label>Attractions</label>
          {formData.attractions.map((attraction, index) => (
            <div key={index} className="attraction-field">
              <input
                type="text"
                value={attraction}
                onChange={(e) => handleAttractionsChange(index, e.target.value)}
                placeholder="Enter an attraction"
              />
            </div>
          ))}
          <button
            type="button"
            className="add-field-btn"
            onClick={addAttractionField}
          >
            + Add Attraction
          </button>
        </div>

        <div className="form-group">
          <label>Images</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <h3>Services</h3>
        <div className="form-group">
          <label>Meals</label>
          <input
            type="text"
            name="services.meals"
            value={formData.services.meals}
            onChange={handleChange}
            placeholder="Enter meal details"
            required
          />
        </div>

        <div className="form-group">
          <label>Return Timing</label>
          <input
            type="text"
            name="services.returnTiming"
            value={formData.services.returnTiming}
            onChange={handleChange}
            placeholder="Enter return timing"
            required
          />
        </div>

        <div className="form-group">
          <label>Group Size</label>
          <input
            type="text"
            name="services.groupSize"
            value={formData.services.groupSize}
            onChange={handleChange}
            placeholder="Enter group size"
            required
          />
        </div>

        <div className="form-group">
          <label>Transport</label>
          <input
            type="text"
            name="services.transport"
            value={formData.services.transport}
            onChange={handleChange}
            placeholder="Enter transport details"
            required
          />
        </div>

        <div className="form-group">
          <label>Pickup and Drop</label>
          <input
            type="text"
            name="services.pickupDrop"
            value={formData.services.pickupDrop}
            onChange={handleChange}
            placeholder="Enter pickup/drop details"
            required
          />
        </div>

        <h3>Price</h3>
        <div className="form-group">
          <label>Single Price</label>
          <input
            type="number"
            name="price.single"
            value={formData.price.single}
            onChange={handleChange}
            placeholder="Enter single price"
            required
          />
        </div>

        <div className="form-group">
          <label>Package Price</label>
          <input
            type="number"
            name="price.package"
            value={formData.price.package}
            onChange={handleChange}
            placeholder="Enter package price"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;