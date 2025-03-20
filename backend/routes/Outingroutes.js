const express = require("express");
const router = express.Router();
const OutingController = require("../controllers/OutingController");

// Create a new outing
router.post("/addOuting", OutingController.addOuting);

// Get all outings
router.get("/allOutings", OutingController.getAllOutings);

// Get single outing by ID
router.get("/allOutings/:id", OutingController.getOutingById);

// Update an outing
router.put("/updateOuting", OutingController.updateOuting);

// Remove an outing
router.post("/removeOuting", OutingController.removeOuting);

module.exports = router;