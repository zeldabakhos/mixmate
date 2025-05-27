const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['alcohol', 'mixer', 'garnish', 'other'],
    default: 'other'
  }
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
