import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-links">
        <a href="/privacy" className="footer-link">Privacy</a>
        <a href="/terms" className="footer-link">Terms</a>
        <a href="/settings" className="footer-link">Settings</a>
      </div>
      <div className="footer-copy">
        <small>© {new Date().getFullYear()} Vinayak Singh</small>
      </div>
    </footer>
  );
};

export default Footer;
