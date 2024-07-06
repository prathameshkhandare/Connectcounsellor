import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css'
const AdminBanner = () => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get('http://localhost:3000/api/userdetails', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

             
                if (response.data && response.data.user.username) {
                    setAdmin(response.data.user);
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

  

    return <div >
        <h2 className='admin-panel-adminbaner-h2'> Welcome, {admin.username}! </h2></div>;
};

export default AdminBanner;
