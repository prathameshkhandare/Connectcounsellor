import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import forgotPassImage from "../assets/Img/forgotpass.png"; // Make sure to add the correct image path
import ForgotPassGif from "../assets/Img/Forgotpassword1.gif"

import CCLOGO from "../assets/Img/connectcounsellor.png"

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading,setisLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  


  const redirectToLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setisLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(`${API_URL}/api/forgot-password`, { email });

      setMessage(response.data.message);
      setTimeout(() => {
        if (response.status === 200) {
          navigate("/resetPassword");
        }
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    }
    finally{
      setisLoading(false);
    }
  };

  return (
    <div className="forgotpass-container">
      <div className="forgotpass-left">
        <img src={ForgotPassGif} className="forgotpass-image" alt="Forgot Password" />
      </div>
      <div className="forgotpass-right">
        <img src={CCLOGO} alt="" className="forgot-CCLOGO"/>
        <p className="forgot-pass-head">Forgot Password</p>
        <div className="forgotpass-form-container">
          <form onSubmit={handleSubmit} className="forgotpass-form">
            {message && <p className="forgotpass-success-message">{message}</p>}
            {error && <p className="forgotpass-error-message">{error}</p>}
            <div className="forgotpass-form-group">
              
              <input
                className="forgot-pass-input"
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="forgotpass-button" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
          <div className="forgotpass-login-redirect">
            <span>Remembered your password?</span>
            <button onClick={redirectToLogin} className="forgotpass-login-link" disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
