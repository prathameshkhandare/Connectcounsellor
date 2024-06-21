import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../Components/Stylesheets/Login.css';
const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Handle login logic here
  };

  const redirectToSignup = () => {
    navigate('/register');
  };

  return (
    <div className="container">
      <div className="login-form-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="signup-redirect">
          <span>Don't have an account?</span>
          <button onClick={redirectToSignup} className="signup-link">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
