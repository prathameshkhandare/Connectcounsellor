import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Components/Stylesheets/Login.css';
import { useAuth } from '../store/AuthContex';
import signinGif from "../assets/Img/signinGif.gif";
import CCLOGO from "../assets/Img/connectcounsellor.png"

const LoginForm = () => {
    const navigate = useNavigate();
    const { storeTokenLS } = useAuth();
    const [isLoading,setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        emailorphone: '',
        password: ''
    });
    const [userRole, setUserRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Store the API URL in a variable
    const API_URL = import.meta.env.VITE_API_URL;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/api/login`, formData);
            if (response.status === 200) {
                storeTokenLS(response.data.token);
                fetchUserDetails();
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setErrorMessage('Your email has not been verified. ' + error.response.data.message);
                } else if (error.response.status === 400) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('Error logging in. Please try again.');
                }
                setFormData({
                    emailorphone: '',
                    password: ''
                });
            } 
            }
            finally{
                setIsLoading(false);
            }
            
        }
    

    const fetchUserDetails = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${API_URL}/api/userdetails`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setUserRole(response.data.user.role);
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
        <>
            <div className="login-form-outer-container">
            <div className="login-form-container">
                <img src={signinGif} alt="Login Image" className="login-image" />

                <form onSubmit={handleLogin} className="login-form">
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <img src={CCLOGO} alt=""className='Login-CCLOGO' />
                    <p className="login-heading">Login to connect counsellor</p>
                    <div className="login-form-group">
                        <input
                            type="text"
                            name="emailorphone"
                            value={formData.emailorphone}
                            onChange={handleChange}
                            placeholder="Email or mobile"
                            required
                        />
                    </div>
                    <div className="login-form-group">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit" className="login-button" disabled={isLoading}>{isLoading ? "Loading..." : "Login"}</button>
                    <div className="login-extra-container">
                        <button onClick={redirecttoForgotpassword} className="login-forgotpass-link">Forgot password?</button>
                        <div className="login-signup-redirect">
                            <span>Don't have an account?</span>
                            <button onClick={redirectToSignup} className="login-signup-link">Create an Account</button>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        </>
    );
};

export default LoginForm;
