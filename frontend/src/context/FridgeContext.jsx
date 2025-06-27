import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FridgeContext = createContext();
export const useFridge = () => useContext(FridgeContext);

export const FridgeProvider = ({ children }) => {
  const [fridgeItems, setFridgeItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch ingredients from your backend API on load
  useEffect(() => {
    const fetchFridge = async () => {
      try {
        const res = await axios.get("/api/fridge"); // 🔁 adjust the route if needed
        setFridgeItems(res.data);
      } catch (err) {
        console.error("Failed to fetch fridge ingredients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFridge();
  }, []);

  const addToFridge = async (ingredient) => {
    try {
      const res = await axios.post("/api/fridge", { name: ingredient });
      setFridgeItems([...fridgeItems, res.data]);
    } catch (err) {
      console.error("Failed to add ingredient to fridge:", err);
    }
  };

  const removeFromFridge = async (ingredientName) => {
    try {
      await axios.delete(`/api/fridge/${ingredientName}`);
      setFridgeItems(fridgeItems.filter((i) => i.name !== ingredientName));
    } catch (err) {
      console.error("Failed to remove ingredient:", err);
    }
  };

  return (
    <FridgeContext.Provider
      value={{
        fridgeItems: fridgeItems.map((i) => i.name), // just return names for UI
        addToFridge,
        removeFromFridge,
        loading,
      }}
    >
      {children}
    </FridgeContext.Provider>
  );
};
