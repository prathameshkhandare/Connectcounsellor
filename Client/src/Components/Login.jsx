import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Components/StyleSheets/Login.css'; // Make sure you import your CSS file with correct path

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
          <div className="login-form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="login-form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="login-signup-redirect">
          <span>Don't have an account?</span>
          <button onClick={redirectToSignup} className="login-signup-link">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
