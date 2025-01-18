const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  distanceFromBangalore: { type: String, required: true },
  nextdate:{type:Date,required:true},
  availabledates:[{type:Date,required:true}],
  duration: { type: String, required: true },
  description: { type: String, required: true },
  bigDescription: { type: String },
  images: [{ type: String }],
  attractions: [{ type: String, required: true }],
  services: {
    meals: { type: String, required: true },
    returnTiming: { type: String, required: true },
    groupSize: { type: String, required: true },
    transport: { type: String, required: true },
    pickupDrop: { type: String, required: true },
  },
  price: {
    single: { type: Number, required: true },
    package: { type: Number, required: true },
  },
});

module.exports = mongoose.model("Product", productSchema);