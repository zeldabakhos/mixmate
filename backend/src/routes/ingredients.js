const express = require("express");
const router = express.Router();

const {
  createIngredient,
  getAllIngredients,
  updateIngredient,
  deleteIngredient,
  saveIngredientFromAPI
} = require("../controllers/ingredientControllers");

const { verifyToken } = require("../middleware/auth");

// Create new ingredient (protected)
router.post("/", verifyToken, createIngredient);

// Get all ingredients (public)
router.get("/", getAllIngredients);

// Update ingredient by id (protected)
router.put("/:id", verifyToken, updateIngredient);

// Delete ingredient by id (protected)
router.delete("/:id", verifyToken, deleteIngredient);

router.post('/save-from-api', saveIngredientFromAPI);

module.exports = router;
