const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: String,
  quantity: String,
});

// ✅ This line prevents the OverwriteModelError:
const Ingredient = mongoose.models.Ingredient || mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
