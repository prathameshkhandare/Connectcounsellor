import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Components/Stylesheets/Login.css';
import { useAuth } from '../store/AuthContex';

const LoginForm = () => {
    const navigate = useNavigate();
    const { storeTokenLS } = useAuth();
    const [formData, setFormData] = useState({
        emailorphone: '',
        password: ''
    });
    const [userRole, setUserRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setErrorMessage(''); // Clear any previous error messages
        try {
            const response = await axios.post('http://localhost:3000/api/login', formData);
            if (response.status === 200) {
                console.log('User logged in:', response.data);
                storeTokenLS(response.data.token);
                // Fetch user details after login
                fetchUserDetails();
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    // User has not verified email
                    setErrorMessage('Your email has not been verified. ' + error.response.data.message);
                } else if (error.response.status === 400) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('Error logging in. Please try again.');
                }
                // Reset form data on error
                setFormData({
                    emailorphone: '',
                    password: ''
                });
            } else {
                setErrorMessage('Error logging in. Please try again.');
            }
            console.error('Error logging in user:', error);
        }
    };

    const fetchUserDetails = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:3000/api/userdetails', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                console.log('User details:', response.data.user);
                setUserRole(response.data.user.role);
                console.log('User role:', response.data.user.role);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage('Unauthorized access. Please log in again.');
            } else {
                console.error('Error fetching user details:', error);
            }
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserDetails();
        }
    }, []);

    useEffect(() => {
        if (userRole) {
            if (userRole === 'admin') {
                navigate('/adminpanel');
            } else {
                navigate('/');
            }
        }
    }, [userRole, navigate]);

    const redirectToSignup = () => {
        navigate('/register');
    };
    
    const redirecttoForgotpassword = () => {
        navigate('/forgotpassword');
    };

    return (
        <div className="container">
            <p className='login-heading'>Login to Connect Counsellor</p>
            <div className="login-form-container">
                <form onSubmit={handleLogin} className="login-form">
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
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

                <div className="login-extra-container">
                    <button onClick={redirecttoForgotpassword} className="login-forgotpass-link">Forgot password?</button>
                    <div className="login-signup-redirect">
                        <span>Don't have an account?</span>
                        <button onClick={redirectToSignup} className="login-signup-link">Create an account</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
