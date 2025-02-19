const mongoose = require("mongoose");

const OutingSchema = new mongoose.Schema({
  id: { 
    type: Number, 
    required: true 
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  distanceFromBangalore: {
    type: String, 
    required: true 
  },
  duration: {
    type: String,
  },
  maxParticipants: {
    type: Number,
  },
  price: {
    package: {
      type: Number,
      required: true,
    },
    single: {
      type: Number,
      required: true,
    }
  },
  description: {
    type: String,
    required: true,
  },
  bigDescription: {
    type: String,
  },
  inclusions: {
    meals: {
      type: String,
    },
    transport: {
      type: String,
    },
    accommodation: {
      type: String,
    },
  },
  services: {
    pickupDrop: {
      type: String,
      required: true,
    },
    transport: {
      type: String,
      required: true,
    },
    groupSize: {
      type: Number,
      required: true,
    },
    returnTiming: {
      type: String,
      required: true,
    },
    meals: {
      type: String,
      required: true,
    }
  },
  contact: {
    organizerName: {
      type: String,
      required: true,
    },
    organizerEmail: {
      type: String,
      required: true,
    },
    organizerPhone: {
      type: String,
      required: true,
    },
  },
  nextdate: {
    type: Date,
    required: true,
  },
  availabledates: [{
    type: Date,
    required: true
  }],
  category: {
    type: String,
    required: true,
  },
  images: [
    { type: String }
  ],
});

module.exports = mongoose.model("Outing", OutingSchema);
