import React, { useState } from 'react';
import '../Components/StyleSheets/AppointmentBooking.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: new Date(),
    reason: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        setMessage('Appointment booking requested successfully');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setMessage('Error booking appointment another status');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setMessage('Error booking appointment');
    }
  };

  return (
    <div className="appointment-booking">
      <h3 className="animated fadeInDown">Book an Appointment</h3>
      <form onSubmit={handleSubmit} className="animated fadeInUp">
        <div className="form-group">
          <label>Reason for Appointment:</label>
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            className="date-picker"
          />
        </div>
        <button type="submit" className="animated pulse infinite">
          Book Appointment
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AppointmentBooking;
