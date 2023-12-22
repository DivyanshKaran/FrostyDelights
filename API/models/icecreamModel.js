const mongoose = require("mongoose");

const iceCreamschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An Ice Cream must have a Name"],
    trim: true,
    unique: true,
  },

  image: {
    type: String,
    required: [true, "An Ice Cream must have an Image"],
    unique: true,
  },

  description: {
    type: String,
    trim: true,
    required: [true, "An Ice Cream must have a description"],
  },

  rating: {
    type: Number,
    min: [1, "Rating must be atleast 1"],
    max: [5, "Rating must not be more than 5"],
    default: 4.0,
    set: (val) => Math.round(val * 10) / 10,
  },

  rating_count: { type: Number },

  ingredients: { type: String },

  price: { type: Number },
});

const IceCream = mongoose.model("IceCream", iceCreamschema);

module.exports = IceCream;
