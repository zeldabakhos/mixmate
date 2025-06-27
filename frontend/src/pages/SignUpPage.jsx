import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import LabelComp from '../components/LabelComp';
import InputForm from '../components/InputForm';

const fieldConfig = [
  { name: "firstName", label: "First Name", type: "text", id: "inputFirstName" },
  { name: "lastName", label: "Last Name", type: "text", id: "inputLastName" },
  { name: "email", label: "Email", type: "email", id: "inputEmail" },
  { name: "password", label: "Password", type: "password", id: "inputPassword" },
];

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (field) => (value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const data = await response.json();
      console.log("Success:", data);
      // Optionally redirect to login page
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card shadow-sm p-4 w-100"
      style={{ maxWidth: "480px", margin: "auto" }}
    >
      <h1 className="text-center mb-4">Sign Up</h1>

      {fieldConfig.map(({ name, label, type, id }) => (
        <div className="mb-3" key={id}>
          <LabelComp htmlFor={id} displayText={label} />
          <InputForm
            id={id}
            type={type}
            value={formData[name]}
            onChange={handleChange(name)}
            ariaDescribe={`${id}Help`}
          />
        </div>
      ))}

      <button type="submit" className="btn btn-primary w-100 mt-3">
        <Link to="/login">Register</Link>
      </button>


      <div className="text-center mt-3">
        Already have an account?{" "}
        <Link to="/login" style={{ textDecoration: "underline", color: "#007bff" }}>
          Log in
        </Link>
      </div>
    </form>
  );
};

export default SignUpPage;
