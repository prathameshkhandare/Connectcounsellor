import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import singupgif from "../assets/Img/signupgif.gif"

const SignupForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccess] = useState('');
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/register', formData);

            if (response.status === 200) {
                setSuccess(response.data.message);
<<<<<<< HEAD
                setTimeout(() => {
                    navigate('/verifyotp', { state: { formData } });
                }, 2000);
=======
                setTimeout((e) => {
                  
                navigate('/verifyotp', { state: { formData } }); 
                
                // Pass formData to the verify OTP page
                },2000)
>>>>>>> 7d03b37b9c47d1e99b5ac5fe4657594b2681c81f
            } else {
                setErrorMessage('Something went wrong! Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data.message);
                setFormData({
                    firstName: '',
                    lastName: '',
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
        <div className="signup-container">
            <div className="signup-form-container">
                <div className="signup-form-left">
                    <img src={singupgif} alt="Signup Illustration" />
                </div>
                <div className="signup-form-right">
                    <p className='registration-heading'>Signup to Connect Counsellor</p>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <form onSubmit={handleSignup} className="signup-form">

                    <div className="signup-form-group">
                        <input type="text" name="firstName" id="firstName" placeholder='Firstname'
                        value={formData.firstName} onChange={handleChange} required/>
                    </div>
                        <div className="signup-form-group">

                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Lastname"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="signup-form-group">
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="signup-form-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="signup-form-group">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="signup-button">Sign Up</button>
                    </form>
                    <div className="signup-login-box">
                        <span>Already have an account?</span>
                        <button onClick={redirectToLogin} className="signup-login-link">Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
