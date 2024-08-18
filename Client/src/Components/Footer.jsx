import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="footer">
      <div className="footer-col-container">
        <div className="footer-column">
          <h3>About Us</h3>
          <ul>
            <li><a href="#advisors">Our Advisors</a></li>
          </ul>
          <div className="social-icons">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
          </div>
        </div>
        <div className="footer-column">
          <h3>Legal</h3>
          <ul>
            <li className="footer-list-item"><Link to="/cookiepolicy">Cookie Policy</Link></li>
            <li className="footer-list-item"><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li className="footer-list-item"><Link to="/refund-cancellation">Refund and Cancellation</Link></li>
            <li className="footer-list-item"><Link to="/terms-conditions">Terms & Condition</Link></li>
            <li className="footer-list-item"><Link to="/disclaimer-policy">Disclaimer Policy</Link></li>
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
          <span className="website-name"> Connect Counsellor</span>
        </p>
        <span>Developed and maintained by <b>Bhavesh Rathod & Prathmesh Khandare</b></span>
      </div>
    </div>
  );
}

export default Footer;
