const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true
  },
  categoryDescription: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  cloudinaryId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Gallery', gallerySchema);
