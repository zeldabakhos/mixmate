import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LabelComp from '../components/LabelComp';
import InputForm from '../components/InputForm';
import AlertComp from '../components/AlertComp';

const LogInPage = ({setIsLoggedIn}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (val) => setEmail(val);
  const handlePasswordChange = (val) => setPassword(val);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
  
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.status === 401) throw Error("Invalid credentials!");
  
      const token = await response.text();
      localStorage.setItem("token", token); 
      setIsLoggedIn(true);
  
      navigate("/products");
    } catch (err) {
      setError(err.message);
    }
  };  

  return (
    <div className="login-page-container">
      <form
        onSubmit={handleSubmit}
        className="card shadow-sm p-4 w-100"
        style={{ maxWidth: "480px", margin: "auto" }}
      >
        <h1 className="text-center">Log In</h1>
  
        <div className="mb-3">
          <LabelComp htmlFor="emailInput" displayText="Email" />
          <InputForm
            onChange={handleEmailChange}
            value={email}
            type="email"
            id="emailInput"
          />
        </div>
  
        <div className="mb-3">
          <LabelComp htmlFor="passwordInput" displayText="Password" />
          <InputForm
            onChange={handlePasswordChange}
            value={password}
            type="password"
            id="passwordInput"
          />
        </div>
  
        {error && <AlertComp alertType="alert-danger" text={error} />}
  
        <button type="submit" className="btn btn-primary w-100">
          Log In
        </button>
  
        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <Link to="/signup" style={{ textDecoration: "underline", color: "#007bff" }}>
            Create one
          </Link>
        </div>
      </form>
    </div>
  );
  
};

export default LogInPage;