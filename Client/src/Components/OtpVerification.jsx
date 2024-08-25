import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import enterOtpGif from "../assets/Img/EnterOTPGif.gif"
import "../Components/StyleSheets/otpverify.css"

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


    const handleresend = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const API_URL = import.meta.env.VITE_API_URL; // Define the base API URL

        try {
            const response = await axios.post(`${API_URL}/api/register`, {
                ...userDetails, // Spread user details to send OTP again
            });

            if (response.status === 200) {
                setSuccessMessage('OTP resent successfully! Please check your email.');
                setErrorMessage('');
            } else {
                setErrorMessage('Something went wrong! Please try again.');
            }
        } catch (error) {
            console.error('Error resending OTP:', error); // Log error for debugging
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data.message); // Display server message
            } else {
                setErrorMessage('Error resending OTP. Please try again later.');
            }
            setSuccessMessage('');
        }
    };


    return (
        <div className="otp-verify-container">
            <div className="otpverify-content">
                {/* Left Side - Image */}
                <div className="otpverify-image-container">
                    <img src={enterOtpGif} alt="OTP Verification" className="otp-image" />
                </div>

                {/* Right Side - Form */}
                <div className="otpverify-form-container">
                    <p className="otp-verify-heading">Verify Your OTP</p>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <form onSubmit={handleOtpSubmit} className="otpverify-form">
                        <div className="otpverify-form-group">
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={handleOtpChange}
                                placeholder="Enter OTP"
                                required
                            />
                        </div>
                        <button type="submit" className="otpverify-button">Verify OTP</button>
                    </form>
                    <div className="otp-login-box">
                        <div className="otp-login-redirect">
                            <span>Didn’t receive an OTP?</span>
                            <button onClick={handleresend} className="otpverify-login-link">Resend</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpVerification;
