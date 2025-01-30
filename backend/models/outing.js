const mongoose = require("mongoose");

const OutingSchema = new mongoose.Schema({
  id: { 
    type: Number, required: true 
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
     type: String, required: true 
    },
  duration: {
    type: String, 
    
  },
  maxParticipants: {
    type: Number,
    
  },
  pricePerPerson: {
    type: Number,
    
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

  nextDate: {
    type: Date,
    required: true,
  },
  
  availabledates:[{
    type:Date,required:true
  }],
  images: [
    { type: String }],
});

module.exports = mongoose.model("Outing", OutingSchema);

