import React from "react";


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
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
            <li>Refund and Cancellation</li>
            <li>Terms & Condition</li>
            <li>Disclaimer Policy</li>
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
