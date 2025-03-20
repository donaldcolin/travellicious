
const Outing = require("../models/outing");

class OutingController {
  // Create a new outing
  static async addOuting(req, res) {
    try {
      let outings = await Outing.find({});
      let id = outings.length > 0 ? outings[outings.length - 1].id + 1 : 1;

      const newOuting = new Outing({
        id,
        ...req.body,
      });

      await newOuting.save();

      res.json({
        success: true,
        message: "Outing saved successfully",
        product: newOuting,
      });
    } catch (error) {
      console.error("Error saving outing:", error);
      res.status(500).json({
        success: false,
        message: "Error saving product",
        error: error.message,
      });
    }
  }

  // Get all outings
  static async getAllOutings(req, res) {
    try {
      const outings = await Outing.find({});
      res.json(outings);
    } catch (error) {
      console.error("Error fetching outing:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching outing",
        error: error.message,
      });
    }
  }

  // Get single outing by ID
  static async getOutingById(req, res) {
    try {
      const outingId = req.params.id;
      
      // Find outing by the custom ID field, not MongoDB's _id
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
  }

  // Update an outing
  static async updateOuting(req, res) {
    try {
      const { id, ...updateData } = req.body;
      const updatedOuting = await Outing.findOneAndUpdate(
        { id },
        { $set: updateData },
        { new: true }
      );

      if (!updatedOuting) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      res.json({
        success: true,
        message: "Product updated successfully",
        product: updatedOuting,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({
        success: false,
        message: "Error updating product",
        error: error.message,
      });
    }
  }

  // Remove an outing
  static async removeOuting(req, res) {
    try {
      const outing = await Outing.findOneAndDelete({ id: req.body.id });

      if (!outing) {
        return res.status(404).json({ success: false, message: "Outing not found" });
      }

      res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
      console.error("Error removing product:", error);
      res.status(500).json({ success: false, message: "Error removing product" });
    }
  }
}

module.exports = OutingController;