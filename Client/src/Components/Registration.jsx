import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/register', formData); 
       
    
      if(response.status === 201){
       
        navigate('/login'); // Redirect to login page on successful registration
      }
      else{
        setErrorMessage('something went wrong !...');
        setFormData({
          username: '',
          phone: '',
          email: '',
          password: ''
        })
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message); // Set error message on failed registration
          setFormData({
            username: '',
            phone: '',
            email: '',
            password: ''
          })


      } else {
        setErrorMessage('Error registering. Please try again.');
      }
      console.error('Error registering user:', error);
    }
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="signup-form-container">
      <form onSubmit={handleSignup} className="signup-form">
        <h2>Sign Up</h2>
        
        <div className="signup-form-group">
        {errorMessage && <p >{errorMessage}</p>}
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="signup-form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="signup-form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="signup-form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <div className="signup-login-redirect">
        <span>Already have an account?</span>
        <button onClick={redirectToLogin} className="signup-login-link">Login</button>
      </div>
    </div>
  );
};

export default SignupForm;
