const Drink = require("../models/drinkModel");

exports.createDrink = async (req, res) => {
  const { name, ingredients, instructions, tags } = req.body;

  try {
    const newDrink = new Drink({
      name,
      ingredients,     // expects an array of ObjectIds (ingredient IDs)
      instructions,
      tags              // optional array of strings
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
