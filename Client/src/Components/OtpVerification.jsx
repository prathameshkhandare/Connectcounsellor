import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OtpVerification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userDetails = location.state?.formData; // Get user details passed from SignupForm

    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        
        const API_URL = import.meta.env.VITE_API_URL; // Define the base API URL

        try {
            const response = await axios.post(`${API_URL}/api/verify-otp`, {
                otp,
                ...userDetails, // Spread user details to send along with OTP
            });

            if (response.status === 200) {
                setSuccessMessage('OTP verified successfully! You can now log in.');
                setErrorMessage('');
                
                setTimeout(() => {
                    navigate('/login');
                }, 200); // Redirect to the login page after 200ms
            }
        } catch (error) {
            console.error('Error verifying OTP:', error); // Log error for debugging
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data.message); // Display server message
            } else {
                setErrorMessage('Error verifying OTP. Please try again later.');
            }
            setSuccessMessage('');
        }
    };

    return (
        <div className="container">
            <p className='signup-container'>Verify Your OTP</p>
            <div className="signup-form-container">
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <form onSubmit={handleOtpSubmit} className="signup-form">
                    <div className="signup-form-group">
                        <label htmlFor="otp">Enter OTP:</label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={handleOtpChange}
                            required
                        />
                    </div>
                    <button type="submit" className="signup-button">Verify OTP</button>
                </form>
                <div className="otp-login-box">
                    <div className="otp-login-redirect">
                        <span>Didn’t receive an OTP?</span>
                        <button onClick={() => navigate('/signup')} className="signup-login-link">Resend</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpVerification;
