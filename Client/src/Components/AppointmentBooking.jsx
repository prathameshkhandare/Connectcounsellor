import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Components/StyleSheets/AppointmentBooking.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
// import './Stylesheets/AppointmentBooking.css'
const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: new Date(),
    reason: '',
    slot: '' // Initially no slot is selected
  });
  const [paymentStatus, setPaymentStatus] = useState('');
  const token = localStorage.getItem('token');
  const [message, setMessage] = useState('');
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const API_URL = "http://localhost:3000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSlotSelect = (slot) => {
    if (slot < 9) {
      slot = parseInt(slot);
      slot += 12;
    }
    setFormData({ ...formData, slot });
  };

  useEffect(() => {
    const fetchBookedAppointments = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/appointments/get`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setBookedAppointments(response.data);
      } catch (error) {
        console.error('Error fetching booked appointments:', error);
      }
    };

    fetchBookedAppointments();
  }, []);

  const isSlotBooked = (slot, date) => {
    return bookedAppointments.some(appointment =>
      new Date(appointment.date).toDateString() === date.toDateString() &&
      appointment.slot === slot
    );
  };

  const initiatePayment = async () => {
    let receiptId = token.toString().slice(0, 25);
    let price = 500;
    try {
      const response = await axios.post(`${API_URL}/api/create`, {
        amount: price,
        receiptId: receiptId,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const { orderId: razorpayOrderId } = response.data;
      const keyResponse = await axios.get(`${API_URL}/api/getkey`);
      const { key } = keyResponse.data;

      const amountInPaise = parseInt(price) * 100;
      const options = {
        key,
        amount: amountInPaise,
        currency: "INR",
        name: `For booking Appointment`,
        description: `${formData.reason}`,
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            const paymentVerificationResponse = await axios.post(
              `${API_URL}/api/verify-payment`,
              {
                paymentId: response.razorpay_payment_id,
                orderId: razorpayOrderId,
                signature: response.razorpay_signature,
              }, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              }
            );
            if (paymentVerificationResponse.data.success) {
              setPaymentStatus('200');
            } else {
              alert("Payment verification failed. Please try again.");
            }
          } catch (verificationError) {
            alert("Payment verification failed. Please try again.");
          }
        },
        theme: {
          color: "#F37254",
        },
      };

      const payment = new window.Razorpay(options);
      payment.open();
    } catch (error) {
      setPaymentStatus('Error initiating payment.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.slot) {
      setMessage('Please select a time slot');
      return;
    }

    try {
      await initiatePayment();

      if (paymentStatus !== '200') {
        alert("Payment failed. Please try again.");
      } else {
        const response = await fetch(`${API_URL}/api/appointments/book`, {
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
        } else if (response.status === 409) {
          setMessage("Appointment already exists");
        }
      }
    } catch (error) {
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
     

      <div className="form-group appointment-booking_input">
        
          <input
            type="text"
            name="reason"
            placeholder='Reason for Appointment'
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>


        <div className="wrapper_date_slot">
          <div className="form-group">
            <label>Date: <span className="selected-date">
              {formData.date.toDateString()}
            </span> </label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              dateFormat="MMMM d, yyyy"
              inline
              className="date-picker"
              minDate={new Date()} // Prevent selecting dates before today
            />
          </div>
          <div className="wrapper_date_slot">
  <div className="slots-section">
    {/* Morning Slots (9 to 12) */}
    <label className="slot-group-label">Morning</label>
    <div className="slots-container">
      {slots.filter(slot => slot >= 9 && slot < 12).map((slot) => (
        <button
          type="button"
          key={slot}
          className={`slot-button ${formData.slot === slot ? 'selected' : ''}`}
          onClick={() => handleSlotSelect(slot)}
          disabled={isSlotBooked(slot, formData.date)}
        >
          {slot}
        </button>
      ))}
    </div>
  </div>

  <div className="slots-section">
    {/* Afternoon Slots (1 to 5) */}
    <label className="slot-group-label">Afternoon</label>
    <div className="slots-container">
      {slots.filter(slot => slot >= 12 && slot <= 5).map((slot) => (
        <button
          type="button"
          key={slot}
          className={`slot-button ${formData.slot === slot ? 'selected' : ''}`}
          onClick={() => handleSlotSelect(slot)}
          disabled={isSlotBooked(slot, formData.date)}
        >
          {slot}
        </button>
      ))}
    </div>
  </div>

  <div className="slots-section">
    {/* Evening Slots (6 to 8) */}
    <label className="slot-group-label">Evening</label>
    <div className="slots-container">
      {slots.filter(slot => slot >= 6 && slot <= 8).map((slot) => (
        <button
          type="button"
          key={slot}
          className={`slot-button ${formData.slot === slot ? 'selected' : ''}`}
          onClick={() => handleSlotSelect(slot)}
          disabled={isSlotBooked(slot, formData.date)}
        >
          {slot}
        </button>
      ))}
    </div>
  </div>
</div>

        </div>
      <button type="submit" className="submit-btn">
        Book Appointment
      </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AppointmentBooking;
