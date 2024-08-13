// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  profilePic: null,
  username:null,
  setIsAuthenticated: () => {},
  logout: () => {},
  setProfilePic: () => {},
  setUsername:()=>{}
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [username,setUsername]=useState(null)
  

  const logout = () => {
    setIsAuthenticated(false);
    setProfilePic(null);  
    setUsername(null)// Clear profile picture
  };

  return (
    <AuthContext.Provider value={{setIsAuthenticated, isAuthenticated, profilePic, logout, setProfilePic,setUsername,username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
