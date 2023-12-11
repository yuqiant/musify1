// AuthContext.js

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  // Check if the user is already authenticated (e.g., check local storage)
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      // setIsAuthenticated(true);
      setUserId(storedUserId);
    }
  }, []);

  // Expose the user ID and authentication status
  const authContextValue = {
    isAuthenticated,
    setIsAuthenticated,
    userId,
    setUserId,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
