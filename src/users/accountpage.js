import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as client from './client'; // Import client to use its functions
import './accountpage.css'; // Import the CSS file

const AccountPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await client.findUserById(userId);
        setUser(userData);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  // Display user's information
  return (
    <div className="Account-container">
      <h1 className="account-heading">Account: {user.username}</h1>
      <div className="account-section">
        <div className="account-row">
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" className="account-input" name="firstName" value={user.firstName} readOnly />
        </div>
        <div className="account-row">
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" className="account-input" name="lastName" value={user.lastName} readOnly />
        </div>
        <div className="account-row">
          <label htmlFor="role">Role</label>
          <input id="role" className="account-input" name="role" value={user.role} readOnly />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
