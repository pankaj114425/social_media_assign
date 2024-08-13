import React from 'react';
import './footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
// import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaFacebookF />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaTwitter />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com/in/pankaj-kumar-b73393249" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaLinkedinIn />
          </a>
        </div>
        <p className="footer-text">© 2024 Hosted by Pankaj Kumar.</p>
      </div>
    </footer>
  );
};

export default Footer;
