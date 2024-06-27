import React, { useState } from 'react';
import "../Components/StyleSheets/AccountSetting.css";

function AccountSetting() {
  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [emailAddress] = useState('bhaiyuvirathod123@gmail.com'); // Example dynamic email address

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your password update logic here
    if (password.newPassword === password.confirmPassword) {
      console.log('Password updated successfully');
    } else {
      console.log('Passwords do not match');
    }
  };

  return (
    <div className="settings-container">
      <h2>Account</h2>
      <p>Edit your account settings and change your password here.</p>
      <div className="email-section">
        <form className='Account-form' onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <div className="email-address">
              <p>Your email address is <strong>{emailAddress}</strong></p>
            </div>
          </div>
          <div className="form-group">
            <input
              type="password"
              name="newPassword"
              value={password.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              value={password.confirmPassword}
              onChange={handleChange}
              placeholder="Re-type new password"
            />
          </div>
          <button type="submit">Change password</button>
        </form>
      </div>
    </div>
  );
}

export default AccountSetting;
