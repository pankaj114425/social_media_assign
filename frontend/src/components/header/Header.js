import React, { useEffect, useState } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authcontext";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
// Adjust path to default profile picture

const Header = () => {
  const {setIsAuthenticated, isAuthenticated, profilePic,  logout, setProfilePic , setUsername} =  useAuth();
  // User authentication status
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      // If there's a token, set the authentication state
      setIsAuthenticated(true);

      // Retrieve profile picture and username from localStorage
      const storedProfilePic = localStorage.getItem("profilePic");
      const storedUsername = localStorage.getItem("username");

      // Set profile picture and username if they exist in localStorage
      if (storedProfilePic) {
        setProfilePic(storedProfilePic);
      }
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, [setIsAuthenticated, setProfilePic, setUsername]);
  const handleLogin = () => {
    // Handle login logic
    navigate("/login");
  };

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("profilePic");
   localStorage.removeItem("username");
    toast.success("User logout successfully!");
    window.location.reload()
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to={"/"}>
          <img src="./social_media.jpg" alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="container">
        <img
          src={profilePic || "./avatr.jpeg"}
          alt="Profile"
          className="profile-pic"
        />

        {!isAuthenticated ? (
          <button onClick={handleLogin} className="auth-button login-button">
            Login
          </button>
        ) : (
          //  <Link to={'./login'}> Login</Link>
          <button onClick={handleLogout} className="auth-button logout-button">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
