import * as client from "./client";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import './signin.css';

function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { setIsAuthenticated, setUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  const signin = async () => {
    try {
      const response = await client.signin(credentials);
      if (response.success) {
        setIsAuthenticated(true);
        setUserId(response.data._id);
        localStorage.setItem('userId', response.data._id);
        navigate('/home');
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Sign-in failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="Signin-container">
      <h1 className="signin-heading">Signin</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <input
        className="signin-input"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <br />
      <input
        className="signin-input"
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button className="btn btn-primary signin-btn" onClick={signin}>Sign-in</button>
      <button className="btn btn-primary signup-btn" onClick={() => navigate("/signup")}>Sign Up</button>
    </div>
  );
}

export default Signin;
