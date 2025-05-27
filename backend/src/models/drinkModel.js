const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  ingredients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredient'
  }],

  instructions: {
    type: String,
    required: true
  },

  tags: [String], // e.g. ['sweet', 'classic', 'tropical']

}, { timestamps: true });

module.exports = mongoose.model('Drink', drinkSchema);
