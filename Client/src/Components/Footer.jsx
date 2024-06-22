import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-col-container">
        <div className="footer-column">
          <h3>About Us</h3>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#advisors">Our Advisors</a></li>
          </ul>
          <div className="social-icons">
            <span>Icon1</span>
            <span>Icon2</span>
            <span>Icon3</span>
          </div>
        </div>
        <div className="footer-column">
          <h3>Legal</h3>
          <ul>
          <li><Link to="/cookiepolicy">Cookie Policy</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/refund-cancellation">Refund and Cancellation</Link></li>
            <li><Link to="/terms-conditions">Terms & Condition</Link></li>
            <li><Link to="/disclaimer-policy">Disclaimer Policy</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Contact Info</h3>
          <ul>
            <li>7666838821</li>
            <li>admin@CounselingHub.com</li>
            <li>Therapies and Enviro Trust</li>
            <li>Banjara Nagar Koulkhed</li>
            <li>Akola 44402, India</li>
          </ul>
        </div>
      </div>
      <div className="Copyright-section">
        <p className="copyright">
          Copyright © 2024 All rights reserved by
          <span className="website-name"> CounselingHub</span>
        </p>
      </div>
    </div>
  );
}

export default Footer;
