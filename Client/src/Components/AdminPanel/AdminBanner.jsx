import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminBanner = () => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            const API_URL = import.meta.env.VITE_API_URL; // Define the base API URL
            
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get(`${API_URL}/api/userdetails`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data && response.data.user) {

                    setAdmin(response.data.user.firstName);
                } else {
                    console.log('Username not found in response');
                }
            } catch (error) {
                console.error('There was an error fetching the admin data!', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className='admin-panel-adminbaner-h2'> Welcome, {admin}! </h2>
        </div>
    );
};

export default AdminBanner;
