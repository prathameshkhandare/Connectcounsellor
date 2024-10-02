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
            <a href="" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/connectcounsellor/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61565562073904&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
          </div>
        </div>
        <div className="footer-column">
          <h3>Legal</h3>
          <ul>
            <li className="footer-list-item"><Link to="/cookiepolicy">Cookie Policy</Link></li>
            <li className="footer-list-item"><Link to="/cookiepolicy">Privacy Policy</Link></li>
            <li className="footer-list-item"><Link to="/terms-conditions">Refund and Cancellation</Link></li>
            <li className="footer-list-item"><Link to="/terms-conditions">Terms & Condition</Link></li>
            
          </ul>
        </div>
        <div className="footer-column">
          <h3>Contact Info</h3>
          <ul>
            <li>+919923287168</li>
            <li>connectcounsellor@gmail.com</li>
            <li>Hingna road,Akola 444004</li>
            <li>Maharashtra, India</li>
          </ul>
        </div>
      </div>
      <div className="Copyright-section">

      <span>Design, Developed and Maintained by <br /><b> <a href="www.linkedin.com/in/bhavesh-rathod-6946a2245">Bhavesh Rathod </a>& <a href="www.linkedin.com/in/prathmesh-khandare-24a116281">Prathmesh Khandare</a></b></span>
        <p className="copyright">
          Copyright © 2024 All rights reserved by
          <span className="website-name"> Connect Counsellor</span>
        </p>
        
       
      </div>
    </div>
  );
}

export default Footer;
