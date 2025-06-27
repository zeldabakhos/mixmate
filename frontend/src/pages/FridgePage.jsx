import React, { useState, useEffect } from "react";
import { useFridge } from "../context/FridgeContext";
import axios from "axios";

const FridgePage = () => {
  const { fridgeItems, addToFridge, removeFromFridge } = useFridge();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      if (searchTerm.length < 2) {
        setResults([]);
        return;
      }

      try {
        const res = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${searchTerm}`
        );
        const ingredients = res.data.ingredients || [];
        setResults(
          ingredients.map((item) => item.strIngredient || item.strIngredient1)
        );
      } catch (err) {
        console.error("Ingredient search failed", err);
        setResults([]);
      }
    };

    const timeoutId = setTimeout(fetchIngredients, 400); // debounce
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleAdd = (ingredient) => {
    if (!fridgeItems.includes(ingredient.toLowerCase())) {
      addToFridge(ingredient.toLowerCase());
    }
    setSearchTerm("");
    setResults([]);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px" }}>
      <h1>My Fridge</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search for an ingredient..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      />

      {/* Suggestions */}
      {results.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, marginBottom: "20px" }}>
          {results.map((ingredient, index) => (
            <li
              key={index}
              onClick={() => handleAdd(ingredient)}
              style={{
                background: "#fff",
                padding: "10px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
              }}
            >
              {ingredient}
            </li>
          ))}
        </ul>
      )}

      {/* Fridge list */}
      {fridgeItems.length === 0 ? (
        <p>Your fridge is empty 😢</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {fridgeItems.map((ingredient, index) => (
            <li
              key={index}
              style={{
                background: "#f7f7f7",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {ingredient}
              <button
                onClick={() => removeFromFridge(ingredient)}
                style={{
                  background: "#e74c3c",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FridgePage;
