import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as client from "./client";

function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "USER" // Default role, can be changed based on your app's logic
  });

  const navigate = useNavigate();

  const signup = async () => {
    try {
      const response = await client.signup(user);
      if (response.error) {
        setError(response.message); // Handle any error messages returned from the server
      } else {
        navigate("/signin"); // Navigate to the sign-in page upon successful signup
      }
    } catch (err) {
      // Error handling, assuming the server sends back a JSON with a message field
      setError(err.response && err.response.data.message ? err.response.data.message : err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };


  return (
    <div>
      <h1>Signup</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <input
        name="username"
        placeholder="Username"
        value={user.username}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
      />
      <input
        name="firstName"
        placeholder="First Name"
        value={user.firstName}
        onChange={handleChange}
      />
      <input
        name="lastName"
        placeholder="Last Name"
        value={user.lastName}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
      />
      <select name="role" value={user.role} onChange={handleChange}>
        <option value="USER">User</option>
        <option value="DJ">DJ</option>
        <option value="ADMIN">Admin</option>
      </select>
      <button onClick={signup}>Signup</button>
      <div>
        Already have an account? <Link to="/signin">Sign In</Link>
      </div>
    </div>
  );
}

export default Signup;