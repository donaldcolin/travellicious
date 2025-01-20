const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: Date, // Optional field
  },
  status: {
    type: String,
    enum: ["pending", "contacted", "resolved"], // Restricted to these values
    default: "pending", // Default value is 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Contact", contactSchema);