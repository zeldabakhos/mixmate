const Drink = require("../models/drinkModel");
const axios = require("axios");

exports.createDrink = async (req, res) => {
  const { name, ingredients, instructions, tags } = req.body;

  try {
    const newDrink = new Drink({
      name,
      ingredients, 
      instructions,
      tags
    });


    const savedDrink = await newDrink.save();
    res.status(201).json(savedDrink);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getDrinkById = async (req, res) => {
  const { id } = req.params;

  try {
    const drink = await Drink.findById(id).populate('ingredients'); // populate ingredients to get their details
    if (!drink) {
      return res.status(404).json({ message: "Drink not found" });
    }
    res.status(200).json(drink);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const Ingredient = require('../models/ingredientModel');

exports.saveCocktailFromAPI = async (req, res) => {
  const { cocktailId } = req.body;
  const userId = req.userId;

  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`);
    const drinkData = response.data.drinks?.[0];
    if (!drinkData) return res.status(404).json({ message: "Drink not found in CocktailDB" });

    const name = drinkData.strDrink;
    const instructions = drinkData.strInstructions;

    // Process ingredients, find or create them in DB and get their IDs
    const ingredientIds = [];
    for (let i = 1; i <= 15; i++) {
      const ingName = drinkData[`strIngredient${i}`];
      const amount = drinkData[`strMeasure${i}`]?.trim() || "";

      if (ingName) {
        // Find ingredient by name, case insensitive
        let ingredient = await Ingredient.findOne({ name: new RegExp(`^${ingName.trim()}$`, 'i') });

        if (!ingredient) {
          // Create if not found
          ingredient = new Ingredient({ name: ingName.trim() });
          await ingredient.save();
        }

        ingredientIds.push(ingredient._id);
      }
    }

    // Check if drink already exists for the user
    const existingDrink = await Drink.findOne({ name, user: userId });
    if (existingDrink) return res.status(400).json({ message: "Drink already saved" });

    const newDrink = new Drink({
      name,
      instructions,
      ingredients: ingredientIds,
      user: userId,
      source: "cocktaildb"
    });

    const savedDrink = await newDrink.save();
    res.status(201).json(savedDrink);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
