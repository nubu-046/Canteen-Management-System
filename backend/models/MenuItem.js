const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true }, // Add this line
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);