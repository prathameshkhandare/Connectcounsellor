import React, { useState } from 'react';
import '../Components/StyleSheets/AccountSetting.css';
import ResetpassGif from "../assets/Img/Resetpassword.gif"

const AccountSetting = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [message, setMessage] = useState('');

  // Store the API URL in a variable
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      setMessage('New password do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/user/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        setMessage('Password changed successfully');
      } else {
        const data = await response.json();
        setMessage(data.message || 'Error changing password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage('Error changing password');
    }
  };
 
  return (
    <div className="account-settings-container">
      <div className="account-settings-image">
        {/* You can replace this with an actual image path */}
        <img src={ResetpassGif} alt="Account Settings" />
      </div>
      <div className="account-settings-form-container">
        <h3>Account Settings</h3>
        <form onSubmit={handleSubmit} className="account-settings-form">
          <div className="account-settings-form-group">
            
            <input
              className='account-settings-input'
              type="password"
              name="currentPassword"
              placeholder='current password'
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="account-settings-form-group">
            
            <input
              className='account-settings-input'
              type="password"
              name="newPassword"
              placeholder='New Password'
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="account-settings-form-group">
           
            <input
              className='account-settings-input'
              type="password"
              name="confirmNewPassword"
              placeholder='Confirm New Password'
              value={formData.confirmNewPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className='account-settings-button'>Change Password</button>
        </form>
        {message && <p className="account-settings-message">{message}</p>}
      </div>
    </div>
  );
};

export default AccountSetting;
