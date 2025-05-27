const express = require("express");
const router = express.Router();

const { createDrink, getDrinkById } = require("../controllers/drinkControllers");
const { verifyToken } = require("../middleware/auth");

// Create a new drink — protect with verifyToken if you want only logged-in users
router.post("/", verifyToken, createDrink);

// Get a drink by id — public route
router.get("/:id", getDrinkById);

// Test route to verify auth middleware (optional)
router.post("/test", verifyToken, (req, res) => {
  console.log(req.userId);
  res.send("Drink route test successful");
});

module.exports = router;
