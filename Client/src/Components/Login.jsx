import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Components/Stylesheets/Login.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailorphone: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', formData);
      // console.log('User logged in:', response.data);
      if(response.status ===200){
        console.log('User logged in:', response.data);
        localStorage.setItem('token', response.data.token);
      }
      // Handle successful login, e.g., store token, redirect to a protected route
      navigate('/'); // Adjust the path as needed
    } catch (error) {
      console.error('Error logging in user:', error);
      // Handle error, e.g., show error message to the user
    }
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
            <label htmlFor="email">Email or mobile</label>
            <input
              type="text"
              id="email"
              name="emailorphone"
              value={formData.emailorphone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
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
