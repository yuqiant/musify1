import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import * as client from "./client";
import './account.css'; // Ensure this path is correct

function Account() {
  const { isAuthenticated, setIsAuthenticated, userId, setUserId } = useContext(AuthContext);
  const [account, setAccount] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchAccount = async () => {
    try {
      const accountData = await client.account();
      if (accountData.dob) {
        const formattedDOB = new Date(accountData.dob).toISOString().split('T')[0];
        accountData.dob = formattedDOB;
      } else {
        accountData.dob = '';
      }
      setAccount(accountData);
      localStorage.setItem('role', accountData.role);
    } catch (err) {
      setError("Failed to load account data.");
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const save = async () => {
    try {
      await client.updateUser(account);
      localStorage.setItem('role', account.role);
    } catch (err) {
      setError("Failed to update account.");
    }
  };

  const signout = async () => {
    try {
      await client.signout();
      setIsAuthenticated(false);
      setUserId(null);
      localStorage.removeItem('userId');
      navigate("/signin");
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };
  const goBack = () => navigate('/'); // go back to home

  return (
    <div className="account-main-section">
      <h1 className="account-heading">Profile</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="account-page-form">
        <div className="account-form-row">
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" className="account-form-input" name="firstName" value={account.firstName} onChange={handleChange} />
        </div>

        <div className="account-form-row">
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" className="account-form-input" name="lastName" value={account.lastName} onChange={handleChange} />
        </div>

        <div className="account-form-row">
          <label htmlFor="dob">Date of Birth</label>
          <input id="dob" className="account-form-input" type="date" name="dob" value={account.dob} onChange={handleChange} />
        </div>

        <div className="account-form-row">
          <label htmlFor="email">Email</label>
          <input id="email" className="account-form-input" name="email" value={account.email} onChange={handleChange} />
        </div>

        <div className="account-form-row">
          <label htmlFor="role">Role</label>
          <input id="role" className="account-form-input" name="role" value={account.role} disabled />
        </div>
    
        <div className="account-action-buttons">
          <button className="btn account-primary-button save-btn" onClick={save}>Save</button>
          <button className="btn account-primary-button signout-btn" onClick={signout}>Signout</button>
        </div>

        {account.role === "ADMIN" && (
          <div className="account-special-button">
            <Link to="/admin/dashboard" className="btn account-secondary-button">User Management</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;