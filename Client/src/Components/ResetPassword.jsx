import React, { useState } from 'react';
import axios from 'axios';

import { useLocation, useNavigate } from 'react-router-dom';
import resetpassGIf from "../assets/Img/Resetpassword.gif"

const ResetPassword = () => {
  // const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading ,setisLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const API_URL = import.meta.env.VITE_API_URL;
    setisLoading(true);
    try {
      console.log(email)
      const response = await axios.post(`${API_URL}/api/reset-password`, { email, otp, newPassword });
      setMessage(response.data.message);
      setError('');

      setTimeout(() => {
        if(response.status === 200){
          navigate("/login");
        }
      }, 3000);
    } catch (err) {
      setError(err.response.data.error || 'Something went wrong. Please try again.');
      setMessage('');
    }
    finally{
      setisLoading(false);
    }
  };

  return (
    <>
      {/* <p className="reset-password-header">Reset Password with OTP</p> */}
      <div className="reset-password-container">
        <div className="reset-password-left">
          <img src={resetpassGIf} alt="Reset Password" />
        </div>
        <div className="reset-password-right">
        <p className="reset-password-header">Reset Password with OTP</p>
          {message && <p className="reset-password-success-message">{message}</p>}
          {error && <p className="reset-password-error-message">{error}</p>}
          <form onSubmit={handleSubmit} className="reset-password-form">
            <div className="reset-password-form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                // onChange={(e) => setEmail(e.target.value)}
                readOnly
                required
              />
            </div>
            <div className="reset-password-form-group">
              <input
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <div className="reset-password-form-group">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="reset-password-button" disabled= {isLoading}>{isLoading ? "Loading..." : "Reset Password"}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
