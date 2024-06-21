import React from 'react';
import { useNavigate } from 'react-router-dom';


const SignupForm = () => {
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    // Handle signup logic here
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="signup-form-container">
      <form onSubmit={handleSignup} className="signup-form">
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <div className="login-redirect">
        <span>Already have an account?</span>
        <button onClick={redirectToLogin} className="login-link">Login</button>
      </div>
    </div>
  );
};

export default SignupForm;
