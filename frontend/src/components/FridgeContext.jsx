import { createContext, useContext, useState } from "react";

const FridgeContext = createContext();

export const useFridge = () => useContext(FridgeContext);

export const FridgeProvider = ({ children }) => {
  const [fridgeItems, setFridgeItems] = useState([]);
  const [notification, setNotification] = useState("");

  const addToFridge = (cocktail) => {
    setFridgeItems((prevItems) => {
      const existing = prevItems.find(
        (item) => item._id === cocktail._id && item.price === cocktail.price
      );

      if (existing) {
        return prevItems.map((item) =>
          item._id === cocktail._id && item.price === cocktail.price
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...cocktail, quantity: 1 }];
      }
    });

    setNotification(`${cocktail.productName || cocktail.strDrink} added to your fridge!`);
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const increaseQuantity = (_id, price) => {
    setFridgeItems((items) =>
      items.map((item) =>
        item._id === _id && item.price === price
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (_id, price) => {
    setFridgeItems((items) =>
      items.map((item) =>
        item._id === _id && item.price === price && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const updateQuantity = (_id, price, quantity) => {
    setFridgeItems((items) =>
      items.map((item) =>
        item._id === _id && item.price === price
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromFridge = (_id, price) => {
    setFridgeItems((items) =>
      items.filter(item => !(item._id === _id && item.price === price))
    );
  };

  const clearFridge = () => setFridgeItems([]);

  return (
    <FridgeContext.Provider
      value={{
        fridgeItems,
        addToFridge,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        removeFromFridge,
        clearFridge,
        notification,
      }}
    >
      {children}
    </FridgeContext.Provider>
  );
};
