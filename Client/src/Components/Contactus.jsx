import React from 'react';
import '../Components/StyleSheets/Contactus.css'
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';


const Contactus = () => {
  return (
    <div className="contact-container">
      <div className="contact-form-container">
        <h3 className='send-msg-heading'>Send Us a Message</h3>
        <form>
          <div className="contact-form-group">
            <input type="text" id="name" name="name" placeholder="Name" required />
          </div>
          <div className="contact-form-group">
            <input type="email" id="email" name="email" placeholder="Email" required />
          </div>
          <div className="contact-form-group">
            <input type="tel" id="phone" name="phone" placeholder="Phone" required />
          </div>
          <div className="contact-form-group">
            <textarea id="message" name="message" placeholder="Your Message" required></textarea>
          </div>
          <button type="submit" className='contact-submit-button'>Submit</button>
        </form>
      </div>
      <div className="contact-info">
        <h3 className='contactus-heading'>Contact Us</h3>
        <h3><FaMapMarkerAlt /> Address</h3>
        <p>Mind Therapy and Enviro Trust, house No 773, koulkhed,BSES Office,<br />  Main Road 
           Near Pocket 'A', akola, Maharashtra 44407, India</p>
        <h3><FaWhatsapp /> WhatsApp</h3>
        <p>+1234567890</p>
        <h3><FaEnvelope /> Email</h3>
        <p>contact@example.com</p>
      </div>
    </div>
  );
};

export default Contactus;
