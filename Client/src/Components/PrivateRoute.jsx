import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from './Loading';
import axios from 'axios';
import CustomNavbar from './CustomNavbar';
import Footer from './Footer';

const PrivateRoute = ({ requiredRole }) => {
  const token = localStorage.getItem('token');
  const [isValid, setValid] = useState(null);
  const [role, setRole] = useState(null);
  const [unauthorized, setUnauthorized] = useState(false);

  const update = async () => {
    const API_URL = import.meta.env.VITE_API_URL; // Define the base API URL

    try {
      const response = await axios.get(`${API_URL}/api/userdetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setValid(true);
        setRole(response.data.user.role);
        console.log(response.data);
      } else {
        setValid(false);
        setUnauthorized(true);
      }
    } catch (error) {
      console.error('Error checking token status:', error);
      setValid(false);
      setUnauthorized(true);
    }
  };

  useEffect(() => {
    if (token) {
      update();
    } else {
      setValid(false);
    }
  }, [token]);

  if (isValid === null) {
    return <div> {<><CustomNavbar/> <Loading/> <Footer/></>}</div>;
  }

  // Check if the user's role matches the required role
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return isValid ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
