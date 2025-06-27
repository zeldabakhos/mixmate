import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCocktails = async (url) => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setCocktails(response.data.drinks || []);
      setError(null);
    } catch (err) {
      setError("Failed to load cocktails");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial cocktails (first letter 'a')
    fetchCocktails("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a");
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === "") return;
    fetchCocktails(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  if (loading) return <p>Loading cocktails...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "0 20px" }}>
      <h1>Explore Cocktails</h1>

      {/* 🔍 Search bar */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search for a cocktail..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button onClick={handleSearch} style={{ padding: "10px 20px" }}>
          Search
        </button>
      </div>

      {/* 🍹 Cocktail grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        {cocktails.map((drink) => (
          <div
            key={drink.idDrink}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              cursor: "pointer",
              textAlign: "center",
            }}
            onClick={() => alert(`Clicked on ${drink.strDrink}`)}
          >
            <img
              src={drink.strDrinkThumb}
              alt={drink.strDrink}
              style={{ width: "100%", borderRadius: "6px" }}
            />
            <h3 style={{ marginTop: "10px" }}>{drink.strDrink}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
