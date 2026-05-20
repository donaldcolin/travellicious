const mongoose = require('mongoose');

const reviewschema = new mongoose.Schema({
    name: {type: String,},
    review:{type:String},
    rating: {type:Number},

})
  module.exports = mongoose.models.Review || mongoose.model("Review", reviewschema);