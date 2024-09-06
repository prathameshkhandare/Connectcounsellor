import React, { useState } from 'react';
import '../Components/StyleSheets/AppointmentBooking.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: new Date(),
    reason: '',
    slot: '' // Initially no slot is selected
  });

  const [message, setMessage] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSlotSelect = (slot) => {
    setFormData({ ...formData, slot });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.slot) {
      setMessage('Please select a time slot');
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/appointments/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
console.log(response)
      if (response.status === 200) {

        setMessage('Appointment booking requested successfully');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else if(response.status=== 409){
        setMessage("Appointment already exits");
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setMessage('Error booking appointment');
    }
  };

  const slots = [
    "9", "10", "11", 
    "12", "1", "2", "3", "4",
    "5", "6", "7", "8"
  ];

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
        {formData.slot && <div className="selected-slot">Selected Slot: {formData.slot}</div>}
        <div className="form-group">
          <label>Slots:</label>
          <div className="slots-container">
            {slots.map((slot) => (
              <button
                type="button"
                key={slot}
                className={`slot-button ${formData.slot === slot ? 'selected' : ''}`}
                onClick={() => handleSlotSelect(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
          {/* Display the selected slot */}
          
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
