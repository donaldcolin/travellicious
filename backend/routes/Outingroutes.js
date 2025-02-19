const express = require("express");
const router = express.Router();
const Outing = require("../models/outing");



router.post("/addOuting", async (req, res) => {
  try {
    let products = await Outing.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const newProduct = new Outing({
      id,
      ...req.body,
    });

    await newProduct.save();

    res.json({
      success: true,
      message: "Outing saved successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error saving outing:", error);
    res.status(500).json({
      success: false,
      message: "Error saving product",
      error: error.message,
    });
  }
});

router.get("/allOutings", async (req, res) => {
  try {
    const products = await Outing.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching outing:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching outing",
      error: error.message,
    });
  }
});

router.put("/updateOuting", async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    const updatedProduct = await Outing.findOneAndUpdate(
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

router.post("/removeOuting", async (req, res) => {
  try {
    const product = await Outing.findOneAndDelete({ id: req.body.id });

    if (!product) {
      return res.status(404).json({ success: false, message: "Outing not found" });
    }

    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, message: "Error removing product" });
  }
});
router.get("/allOutings/:id", async (req, res) => {
  try {
    const outingId = req.params.id;
    
    // Find product by the custom ID field, not MongoDB's _id
    const outing = await Outing.findOne({ id: Number(outingId) });

    if (!outing) {
      return res.status(404).json({ 
        success: false, 
        message: `Product with ID ${outingId} not found` 
      });
    }

    res.json(outing);
  } catch (error) {
    console.error(`Error fetching product with ID ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
});
  
module.exports = router;