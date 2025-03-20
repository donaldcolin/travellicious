// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

// Add a new product
router.post("/addproduct", ProductController.addProduct);

// Get all products
router.get("/allproducts", ProductController.getAllProducts);

// Get single product by ID
router.get("/allproducts/:id", ProductController.getProductById);

// Update a product (using request body for ID)
router.put("/updateproduct", ProductController.updateProduct);

// Update a product (using URL parameter for ID)
router.put("/updateproduct/:id", ProductController.updateProductById);

// Remove a product
router.post("/removeproduct", ProductController.removeProduct);

module.exports = router;