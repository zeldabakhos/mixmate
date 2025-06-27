// drinkModel.js
const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  instructions: String,
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // if applicable
  source: String,
});

module.exports = mongoose.model('Drink', drinkSchema);

// ingredientModel.js
const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  alcoholContent: Number,
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
