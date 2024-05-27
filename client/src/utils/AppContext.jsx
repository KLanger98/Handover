// AppContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
const AuthContext = createContext();

import { jwtDecode } from 'jwt-decode';

export const AuthProvider = ({ children, ...props}, ) => {
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const { toggle } = props;

  useEffect(() => {

    const token = localStorage.getItem('id_token');
    
    
    setIsLoggedIn(!!token);
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;    // Convert to seconds
       
       if (decodedToken.exp < currentTime) {
        // Token has expired
        localStorage.removeItem('id_token');
        setIsLoggedIn(false);
        setUserProfile(null);
      } else {
        const { password, ...user } = decodedToken.data;
        setIsLoggedIn(true);
        setUserProfile(user);
      }
    }
    setLoading(false); // Set loading to false after checking token

  }, []);



  const login = (token, { password, ...user }) => {
    localStorage.setItem('id_token', token);
    setIsLoggedIn(true);

    setUserProfile(user); // Set user profile upon login
  };

  const logout = () => {
    localStorage.removeItem('id_token');
    setIsLoggedIn(false);
    setUserProfile(null); // Clear user profile upon logout
  };


  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, userProfile, loading, toggle }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export const useAuth = () => useContext(AuthContext);