// src/components/ResetPasswordWithOTP.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/reset-password', { email, otp, newPassword });
      setTimeout(() => {
        if(response.status==200){
          navigate("/login");
        }
      }, 3000);
      setMessage(response.data.message);
      setError(''); // Clear any previous errors
    } catch (err) {
      setError(err.response.data.error || 'Something went wrong. Please try again.');
      setMessage(''); // Clear any previous messages
    }
  };

  return (
    <div className="reset-password-container">
      <h2 className="reset-password-header">Reset Password with OTP</h2>
      {message && <p className="reset-password-success-message">{message}</p>}
      {error && <p className="reset-password-error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="reset-password-form">
        <div className="reset-password-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="reset-password-form-group">
          <label htmlFor="otp">OTP:</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <div className="reset-password-form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="reset-password-button">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
