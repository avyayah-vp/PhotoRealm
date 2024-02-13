import './Login.css';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8080/api/users/login', { email, password });

      if (res.status === 200) {
        console.log(`Email: ${email}, Password: ${password}`);
        localStorage.setItem('token', res.data.token);
        setIsLoggedIn(true); // Update the isLoggedIn state
        navigate('/display');
      } else {
        console.error('Login failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="loginDiv">
      <form onSubmit={handleSubmit} className="loginForm">
        <h1 className="loginTitle">Login</h1>
        <label className="loginLabel">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="loginInput"
          />
        </label>
        <label className="loginLabel">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="loginInput"
          />
        </label>
        <button type="submit" className="loginButton">Login</button>
      </form>
    </div>
  );
};

export default Login;
