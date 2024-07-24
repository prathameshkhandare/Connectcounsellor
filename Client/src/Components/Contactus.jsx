import React, { useState } from 'react';
import '../Components/StyleSheets/Contactus.css';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;
    const mailtoLink = `mailto:rathodbhaveshpdp@gmail.com?subject=Contact Form Submission&body=Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0AMessage: ${message}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="contact-container">
      <div className="contact-form-container">
        <h3 className='send-msg-heading'>Send Us a Message</h3>
        <form onSubmit={handleSubmit}>
          <div className="contact-form-group">
            <input type="text" id="name" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} />
          </div>
          <div className="contact-form-group">
            <input type="email" id="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
          </div>
          <div className="contact-form-group">
            <input type="tel" id="phone" name="phone" placeholder="Phone" required value={formData.phone} onChange={handleChange} />
          </div>
          <div className="contact-form-group">
            <textarea id="message" name="message" placeholder="Your Message" required value={formData.message} onChange={handleChange}></textarea>
          </div>
          <button type="submit" className='contact-submit-button'>Submit</button>
        </form>
      </div>
      <div className="contact-info">
        <h3 className='contactus-heading'>Contact Us</h3>
        <h4><FaMapMarkerAlt /> Address</h4>
        <p>Mind Therapy and Enviro Trust, house No 773, Koulkhed, BSES Office,<br /> Main Road 
           Near Pocket 'A', Akola, Maharashtra 44407, India</p>
        <h4><FaWhatsapp /> WhatsApp</h4>
        <p>+1234567890, 76668238821, 7365238732, 736728191</p>
        <h4><FaEnvelope /> Email</h4>
        <p>contact@example.com, bhaiyuvirathod123@gmail.com,<br /> rathodbhaveshpdp@gmail.com</p>
      </div>
    </div>
  );
};

export default Contactus;
