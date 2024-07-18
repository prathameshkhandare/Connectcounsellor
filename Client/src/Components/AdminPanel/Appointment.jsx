import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        setAppointments(response.data);
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
  const response = await axios.post(`http://localhost:3000/api/appointments/${id}`, { status }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  // Update appointments state to reflect the status change
  setAppointments(appointments.map(app => app._id === id ? { ...app, status } : app));
} catch (error) {
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response error:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request error:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
      }
      console.error('Config:', error.config);
    }
  };

  return (
    <div>
      <h1>Appointment Requests</h1>
      <ul>
        {appointments.map(app => (
          <li key={app._id}>
            <p>User: {app.userId}</p>
            <p>Date: {new Date(app.date).toLocaleString()}</p>
            <p>Reason: {app.reason}</p>
            <p>Status: {app.status}</p>
            {app.status === 'pending' && (
              <div>
                <button onClick={() => handleStatusChange(app._id, 'accepted')}>Accept</button>
                <button onClick={() => handleStatusChange(app._id, 'rejected')}>Reject</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointment;
