import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Components/Stylesheets/Login.css';

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        emailorphone: '',
        password: ''
    });
    const [userRole, setUserRole] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/login', formData);
            if (response.status === 200) {
                console.log('User logged in:', response.data);
                localStorage.setItem('token', response.data.token);

                // Fetch user details after login
                fetchUserDetails();
            }
        } catch (error) {
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
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
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
