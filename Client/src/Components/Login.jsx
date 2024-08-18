import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Components/Stylesheets/Login.css';
import { useAuth } from '../store/AuthContex';
import signinGif from "../assets/Img/signinGif.gif"
import logo from "../assets/Img/mind_logo.png"

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
        setErrorMessage('');
        try {
            const response = await axios.post('http://localhost:3000/api/login', formData);
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
            } else {
                setErrorMessage('Error logging in. Please try again.');
            }
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
       <div className="logo">
       <img src={logo} alt="" />
       </div>
        <div className="login-form-container">
          
            <img src={signinGif} alt="Login Image" className="login-image" />
            <form onSubmit={handleLogin} className="login-form">
                {errorMessage && <p className="error-message">{errorMessage}</p>}
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
                <button type="submit" className="login-button">Login</button>
                <div className="login-extra-container">
                    <button onClick={redirecttoForgotpassword} className="login-forgotpass-link">Forgot password?</button>
                    <div className="login-signup-redirect">
                        <span>Don't have an account?</span>
                        <button onClick={redirectToSignup} className="login-signup-link">Create an account</button>
                    </div>
                </div>
            </form>
        </div>
        </>
    );
};

export default LoginForm;
