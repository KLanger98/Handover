// AppContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // Additional state for user profile

  useEffect(() => {
    const token = localStorage.getItem('id_token');
    setIsLoggedIn(!!token);
    // Optionally, fetch and set user profile here if token exists
    if (token) {
      // Placeholder for fetching user profile
      setUserProfile({});
    }
  }, []);

  const login = (token, profile) => {
    localStorage.setItem('id_token', token);
    setIsLoggedIn(true);
    setUserProfile(profile); // Set user profile upon login
  };

  const logout = () => {
    localStorage.removeItem('id_token');
    setIsLoggedIn(false);
    setUserProfile(null); // Clear user profile upon logout
  };



  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, userProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export const useAuth = () => useContext(AuthContext);