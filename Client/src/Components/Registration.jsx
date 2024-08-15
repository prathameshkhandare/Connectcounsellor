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
    const [successMessage, setSuccess]= useState('');
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            // Send registration details to the server
            const response = await axios.post('http://localhost:3000/api/register', formData);

            if (response.status === 200) {
                // Redirect to the OTP verification page with user details
                setSuccess(response.data.message);
                setTimeout((e) => {
                  
                navigate('/verifyotp', { state: { formData } }); 
                
                // Pass formData to the verify OTP page
                },2000)
            } else {
                setErrorMessage('Something went wrong! Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data.message); // Set error message on failed registration
                setFormData({
                    username: '',
                    phone: '',
                    email: '',
                    password: ''
                });
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
        <div className="container">
            <p className='signup-container'>Signup to Connect Counsellor</p>
            <div className="signup-form-container">
                <form onSubmit={handleSignup} className="signup-form">
                    <div className="signup-form-group">
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="signup-form-group">
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
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
                <div className="signup-login-box">
                    <div className="signup-login-redirect">
                        <span>Already have an account?</span>
                        <button onClick={redirectToLogin} className="signup-login-link">Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
