const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Contact = require("../models/Contact");

// Add a new product
router.post("/addproduct", async (req, res) => {
  try {
    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const newProduct = new Product({
      id,
      ...req.body,
    });

    await newProduct.save();

    res.json({
      success: true,
      message: "Product saved successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({
      success: false,
      message: "Error saving product",
      error: error.message,
    });
  }
});

// Get all products
router.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find({});
    
    // Map products to include full image URLs
    const productsWithFullImages = products.map(product => ({
      ...product.toObject(),
      image: product.image ? `http://localhost:4000/images/${product.image}` : null
    }));

    res.json(productsWithFullImages);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
});

router.get("/allproducts/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    
    // Find product by the custom ID field, not MongoDB's _id
    const product = await Product.findOne({ id: Number(productId) });

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: `Product with ID ${productId} not found` 
      });
    }

    res.json(product);
  } catch (error) {
    console.error(`Error fetching product with ID ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
});

// Update a product
router.put("/updateproduct", async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    const updatedProduct = await Product.findOneAndUpdate(
      { id },
      { $set: updateData },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
});
router.put("/updateproduct/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the request params
    const updateData = req.body; // Extract other data from the request body

    // Find and update the product
    const updatedProduct = await Product.findOneAndUpdate(
      { id: id }, // Assuming `id` is the MongoDB ObjectId; adjust if necessary
      { $set: updateData },
    );

    if (!updatedProduct) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
});

// Remove a product
router.post("/removeproduct", async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.body.id });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, message: "Error removing product" });
  }
});

module.exports = router;