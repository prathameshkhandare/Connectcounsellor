import React, { useState } from 'react';
import '../Components/StyleSheets/AppointmentBooking.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AppointmentBooking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend)
    console.log('Booking appointment for:', formData);
  };

  return (
  
    <div className="appointment-booking">
        
      <h3 className="animated fadeInDown">Book an Appointment</h3>
      <form onSubmit={handleSubmit} className="animated fadeInUp">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
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
    </div>
  );
};

export default AppointmentBooking;
