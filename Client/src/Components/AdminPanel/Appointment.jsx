import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css'; // CSS file import kiya gaya hai

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;



  




  useEffect(() => {
    const fetchAppointments = async () => {
      // const API_URL = import.meta.env.VITE_API_URL; 
      // Base API URL ko define kiya gaya hai
      
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found in localStorage');
        }

        const response = await axios.get(`${API_URL}/api/appointments/get`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('Fetched appointments:', response.data); // Debug log

        // Ensure response data is an array
        if (Array.isArray(response.data)) {
          // Appointments ko date ke hisaab se descending order mein sort kiya
          const sortedAppointments = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setAppointments(sortedAppointments);
        } else {
          throw new Error('Response data is not an array');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Failed to fetch appointments. Please try again later.'); // Error message set kiya
      }
    };

    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, status) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    try {
      await axios.post(`${API_URL}/api/appointments/${id}`, { status }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Appointments state ko update kiya
      const updatedAppointments = appointments.map(app => 
        app._id === id ? { ...app, status } : app
      );

      // Updated appointments ko date ke hisaab se descending order mein sort kiya
      const sortedUpdatedAppointments = updatedAppointments.sort((a, b) => new Date(b.date) - new Date(a.date));
      setAppointments(sortedUpdatedAppointments);
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  return (
    <>
      <h1 className="admin_appointment_title">Appointment Requests</h1>
      {error && <p className="error-message">{error}</p>} {/* Error message dikhaye agar exist kare */}
      <div className="admin_appointment_container">
        <ul className="admin_appointment_list">
          {appointments.map(app => (
            <li key={app._id} className="admin_appointment_item">
              <div className="admin_appointment_details">
                {/* User ID ko sahi se access karna */}
                <p className="admin_appointment_user">user: {app.userId.firstName}</p>
                <p className="admin_appointment_user">Email: {app.userId.email}</p>
                <p className="admin_appointment_date">Date: {new Date(app.date).toISOString().split('T')[0]}</p>
                <p className="admin_appointment_date">Slot: {app.slot}-{parseInt(app.slot) +1}</p>
                <p className="admin_appointment_reason">Reason: {app.reason}</p>
                <p className="admin_appointment_status">Status: {app.status}</p>
                {app.status === 'pending' && (
                  <div className="admin_appointment_buttons">
                    <button className="admin_appointment_button accept" onClick={() => handleStatusChange(app._id, 'accepted')}>Accept</button>
                    <button className="admin_appointment_button reject" onClick={() => handleStatusChange(app._id, 'rejected')}>Reject</button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Appointment;
