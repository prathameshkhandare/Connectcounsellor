import React from 'react';
import './Stylesheets/Help.css'; // Assuming you have a Help.css file for styling
import HelpImg from "../assets/Img/Helpimg.png";
import { FaEnvelope, FaPhone } from "react-icons/fa"; // Correct import for FontAwesome icons

const Help = () => {
  return (
    <div className="help-container">
      <img src={HelpImg} alt="Help" className="help-img" />

      <div className="help-instruction">
        <p>Call us at the number below or drop an email at the given email ID:</p>
      </div>
      <div className="help-contact">
      <p> <FaPhone /> +91-9923287168</p>
      </div>
      <div className="help-contact">
      <p>  <FaEnvelope /> connectcounsellor@gmail.com</p>
      </div>
    </div>
  );
};

export default Help;
