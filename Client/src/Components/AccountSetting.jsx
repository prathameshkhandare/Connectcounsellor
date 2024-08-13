import React, { useState } from 'react';
import '../Components/StyleSheets/AccountSetting.css';

const AccountSetting = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [message, setMessage] = useState('');

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
      const response = await fetch('http://localhost:3000/api/user/change-password', {
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
      <h3>Account Settings</h3>
      <form onSubmit={handleSubmit} className="account-settings-form">
        <div className="account-settings-form-group">
          <label>Current Password:</label>
          <input
            className='account-settings-input'
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="account-settings-form-group">
          <label>New Password:</label>
          <input
            className='account-settings-input'
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="account-settings-form-group">
          <label>Confirm New Password:</label>
          <input
            className='account-settings-input'
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className='account-settings-button'>Change Password</button>
      </form>
      {message && <p className="account-settings-message">{message}</p>}
    </div>
  );
};

export default AccountSetting;
