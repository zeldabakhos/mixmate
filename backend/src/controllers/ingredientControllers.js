const Ingredient = require("../models/ingredientModel");

// Create a new ingredient
exports.createIngredient = async (req, res) => {
  const { name, type, alcoholContent } = req.body;

  try {
    const newIngredient = new Ingredient({ name, type, alcoholContent });
    const savedIngredient = await newIngredient.save();
    res.status(201).json(savedIngredient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// List all ingredients
exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find({});
    res.status(200).json(ingredients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update ingredient by ID
exports.updateIngredient = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedIngredient = await Ingredient.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedIngredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }
    res.status(200).json(updatedIngredient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete ingredient by ID
exports.deleteIngredient = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedIngredient = await Ingredient.findByIdAndDelete(id);
    if (!deletedIngredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }
    res.status(200).json({ message: "Ingredient deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.saveIngredientFromAPI = async (req, res) => {
  const { ingredientId } = req.body;

  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${ingredientId}`);
    const ingredientData = response.data.ingredients?.[0];
    if (!ingredientData) return res.status(404).json({ message: "Ingredient not found in CocktailDB" });

    const name = ingredientData.strIngredient;
    const type = ingredientData.strType || "";
    const alcoholContent = ingredientData.strAlcohol ? (ingredientData.strAlcohol.toLowerCase() === 'yes' ? 1 : 0) : 0;

    // Avoid duplicates
    const existingIngredient = await Ingredient.findOne({ name: new RegExp(`^${name}$`, 'i') });
    if (existingIngredient) return res.status(400).json({ message: "Ingredient already saved" });

    const newIngredient = new Ingredient({ name, type, alcoholContent });
    const savedIngredient = await newIngredient.save();
    res.status(201).json(savedIngredient);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
