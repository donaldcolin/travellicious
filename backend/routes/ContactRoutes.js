const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST: Create a new contact
router.post("/contact", async (req, res) => {
  const { name, email, phone, date, status } = req.body;

  // Validate the required fields
  if (!name || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and phone are required fields.",
    });
  }

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      date,
      status,
    });

    await newContact.save();

    res.json({
      success: true,
      message: "Contact saved successfully",
      contact: newContact,
    });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({
      success: false,
      message: "Error saving contact",
      error: error.message,
    });
  }
});

// GET: Get all contacts
router.get("/allcontact", async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching contacts",
      error: error.message,
    });
  }
});

// PUT: Update a contact
router.put("/updatecontact", async (req, res) => {
  const { _id } = req.body; // Expect `_id` in the request body
  const updateData = req.body; // Other fields to update

  try {
    // Find the contact by `_id` and update it
    const updatedContact = await Contact.findByIdAndUpdate(_id, updateData, {
      new: true, // Return the updated document
    });

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    // Respond with the updated contact
    res.json({
      success: true,
      message: "Contact updated successfully",
      contact: updatedContact,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({
      success: false,
      message: "Error updating contact",
      error: error.message,
    });
  }
});

// DELETE: Remove a contact
router.post("/removecontact", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContact = await Contact.findOneAndDelete({ id });

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.json({
      success: true,
      message: "Contact deleted successfully",
      contact: deletedContact,
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting contact",
      error: error.message,
    });
  }
});

module.exports = router;