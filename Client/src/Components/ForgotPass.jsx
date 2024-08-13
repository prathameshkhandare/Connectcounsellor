import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const redirectToLogin = () => {
    navigate("/login");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/forgot-password",
        { email }
      );
      
      setMessage(response.data.message);
      setTimeout(() => {
        if(response.status==200){
          navigate("/resetPassword");
        }
      }, 3000);
    } catch (err) {
      setError(
        err.response.data.error || "Something went wrong. Please try again."
      );
    }
  };


  return (
    <>
    <p className="forgot-pass-head">forgot password</p>
    <div className="forgotpass-container">
      <div className="forgotpass-form-container">
        <form onSubmit={handleSubmit} className="forgotpass-form">
        
          {message && <p className="forgotpass-success-message">{message}</p>}
          {error && <p className="forgotpass-error-message">{error}</p>}
          <div className="forgotpass-form-group">
            <label htmlFor="email">Email Address</label>
            <input className="forgot-pass-input"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="forgotpass-button">
            Submit
          </button>
        </form>
        <div className="forgotpass-login-redirect">
          <span>Remembered your password?</span>
          <button onClick={redirectToLogin} className="forgotpass-login-link">
            Login
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ForgotPass;
