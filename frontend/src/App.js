import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MyFridge from "./pages/FridgePage";
import MyDrinks from "./pages/MyDrinks";
import MakeADrink from "./pages/MakeADrink";
import Profile from "./pages/Profile";
import SignUpPage from './pages/SignUpPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <Router>
      {isAuthenticated && <Navbar logout={logout} />}
      <Routes>
        <Route path="/login" element={<LoginPage login={login} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/myfridge" element={isAuthenticated ? <MyFridge /> : <Navigate to="/login" />} />
        <Route path="/mydrinks" element={isAuthenticated ? <MyDrinks /> : <Navigate to="/login" />} />
        <Route path="/makeadrink" element={isAuthenticated ? <MakeADrink /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
