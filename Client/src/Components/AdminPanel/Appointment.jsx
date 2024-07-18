import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css'; // Make sure to import the CSS file

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/appointments/get', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Sort appointments by date in descending order
        const sortedAppointments = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAppointments(sortedAppointments);
      } catch (error) {
        console.error('Error fetching appointments', error);
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
      await axios.post(`http://localhost:3000/api/appointments/${id}`, { status }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Update appointments state to reflect the status change
      const updatedAppointments = appointments.map(app => app._id === id ? { ...app, status } : app);

      // Sort the updated appointments by date in descending order
      const sortedUpdatedAppointments = updatedAppointments.sort((a, b) => new Date(b.date) - new Date(a.date));
      setAppointments(sortedUpdatedAppointments);
    } catch (error) {
      if (error.response) {
        console.error('Response error:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request error:', error.request);
      } else {
        console.error('Error:', error.message);
      }
      console.error('Config:', error.config);
    }
  };

  return (
    <>
    
      <h1 className="admin_appointment_title">Appointment Requests</h1>
    <div className="admin_appointment_container">
      <ul className="admin_appointment_list">
        {appointments.map(app => (
          <li key={app._id} className="admin_appointment_item">
            <div className="admin_appointment_details">
              <p className="admin_appointment_user">User: {app.userId.username}</p>
              <p className="admin_appointment_date">Date: {new Date(app.date).toLocaleString()}</p>
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
