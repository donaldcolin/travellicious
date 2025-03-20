// routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/ContactController");

// POST: Create a new contact
router.post("/contact", ContactController.createContact);

// GET: Get all contacts
router.get("/allcontact", ContactController.getAllContacts);

// PUT: Update a contact
router.put("/updatecontact", ContactController.updateContact);

// DELETE: Remove a contact - Note: This should be a DELETE request instead of POST
router.post("/removecontact", ContactController.removeContact);

module.exports = router;