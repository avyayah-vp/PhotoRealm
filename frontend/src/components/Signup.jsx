import "./Signup.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/users/register", {
        name,
        email,
        password,
      });

      if (res.status === 201) {
        console.log(`Name: ${name}, Password: ${password}`);
        localStorage.setItem("token", res.data.token);
        navigate("/login");
      } else {
        console.error("Registration failed");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        console.error("A user with this email already exists");
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className="signupDiv">
      <form onSubmit={handleSubmit} className="signupForm">
        <h1 className="signupTitle">Sign Up</h1>
        <label className="signupLabel">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="signupInput"
          />
        </label>
        <label className="signupLabel">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signupInput"
          />
        </label>
        <label className="signupLabel">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signupInput"
          />
        </label>
        <button type="submit" className="signupButton">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
