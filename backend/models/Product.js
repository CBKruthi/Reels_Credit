const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  brand: String,
  price: Number,
  originalPrice: Number,
  image: String,
  discount: String,
  rating: Number,
  reviews: Number
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
