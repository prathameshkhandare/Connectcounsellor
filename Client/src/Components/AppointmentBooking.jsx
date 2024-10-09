import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Components/StyleSheets/AppointmentBooking.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
// Import the FontAwesomeIcon component and specific icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMoon,faSun,faMountainSun
  
} from "@fortawesome/free-solid-svg-icons";

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(true);
  const [isLoading,setisLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date(),
    reason: "",
    slot: "",
  });
  const [paymentStatus, setPaymentStatus] = useState("");
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  // const API_URL='http://localhost:3000'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSlotSelect = (slot) => {
    const formattedSlot = slot < 9 ? parseInt(slot) + 12 : slot;
    setFormData({ ...formData, slot: formattedSlot });
  };

  useEffect(() => {
    const fetchBookedAppointments = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/appointments/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookedAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching booked appointments:", error);
      }
    };

    fetchBookedAppointments();
  }, []);



  const isSlotBooked = (slot, date) => {
    return bookedAppointments.some(
      (appointment) =>
        new Date(appointment.date).toDateString() === date.toDateString() &&
        appointment.slot === slot
    );
  };

  const bookAppointment = async () => {
    setisLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/appointments/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        setMessage("Appointment booking requested successfully");
        setTimeout(() => navigate("/"), 4000);
      } else if (response.status === 409) {
        setMessage("Appointment already exists");
      }
    } catch (error) {
      setMessage("Error booking appointment");
    }
    finally{
      setisLoading(false);
    }
  };

  const initiatePayment = async () => {
    let receiptId = token.toString().slice(0, 25);
    let price = 500;
    try {
      const response = await axios.post(
        `${API_URL}/api/create`,
        {
          amount: price,
          receiptId: receiptId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { orderId: razorpayOrderId } = response.data;
      // const keyResponse = await axios.get(`${API_URL}/api/getkey`);
      // const { key } = keyResponse.data;
      const key = import.meta.env.RAZORPAY_KEY_ID
      const amountInPaise = parseInt(price) * 100;
      const options = {
        key,
        amount: amountInPaise,
        currency: "INR",
        name: "For booking Appointment",
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
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (paymentVerificationResponse.data.success) {
              setPaymentStatus("200");
              await bookAppointment();
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
      setPaymentStatus("Error initiating payment.");
    }
  };

  const handleSubmit = async (e) => {
    setisLoading(true);
    e.preventDefault();

    if (!formData.slot) {
      setMessage("Please select a time slot");
      return;
    }

    try {
      await initiatePayment();
    } catch (error) {
      setMessage("Error booking appointment");
    }
    finally{
      isLoading(false);
    }
  };

  const slots = [
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
  ];

  return (
    <div className="appointment-booking">
      <h3 className="animated fadeInDown">Book an Appointment</h3>
      <label className="Notelable1">
        All booking dates and times are in Indian Standard Time (IST)
      </label>
      <form onSubmit={handleSubmit} className="animated fadeInUp">
        <div className="form-group appointment-booking_input">
          <input 
            id="appointment-booking_input"
            type="text"
            name="reason"
            placeholder="Reason for Appointment"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>
        <div className="wrapper_date_slot">
          <div className="form-group">
            <label>
              Date:{" "}
              <span className="selected-date">
                {formData.date.toDateString()}
              </span>
            </label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              dateFormat="MMMM d, yyyy"
              inline
              className="date-picker"
              minDate={new Date()}
              maxDate={new Date(new Date().setDate(new Date().getDate() + 7))}
            />



          </div>
          <div className="rightwrapper">
            <div className="rightcontainerslot">
              <div className="slots-section">
              <label className="slot-group-label"> <FontAwesomeIcon icon={faMountainSun} /> Morning</label>
                <div className="slots-container">
                  {slots
                    .filter((slot) => slot >= 9 && slot < 12)
                    .map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        className={`slot-button ${
                          formData.slot === slot ? "selected" : ""
                        }`}
                        onClick={() => handleSlotSelect(slot)}
                        disabled={isSlotBooked(slot, formData.date)}
                      >
                        {slot} AM
                      </button>
                    ))}
                </div>
              </div>
              <div className="afternoon-slot-section">
              <label className="slot-group-label"> <FontAwesomeIcon icon={faSun} />  Afternoon</label>
              
                
                
                <div className="afternoon-slot-container">
                  {slots
                    .filter((slot) => slot >= 12 && slot < 18)
                    .map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        className={`afternoon-slot-button ${
                          formData.slot === slot ? "selected" : ""
                        }`}
                        onClick={() => handleSlotSelect(slot)}
                        disabled={isSlotBooked(slot, formData.date)}
                      >
                        {slot < 13 ? slot : slot - 12} PM
                      </button>
                    ))}
                </div>
              </div>
              <div className="slots-section">
              <label className="slot-group-label"> <FontAwesomeIcon icon={faMoon} />   Evening</label>
                <div className="slots-container_eve">
                  {slots
                    .filter((slot) => slot >= 18 && slot <= 20)
                    .map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        className={`slot-button ${
                          formData.slot === slot ? "selected" : ""
                        }`}
                        onClick={() => handleSlotSelect(slot)}
                        disabled={isSlotBooked(slot, formData.date)}
                      >
                        {slot < 13 ? slot : slot - 12} PM
                      </button>
                    ))}
                </div>
              
              </div>
            </div>
            <div className="button-container">
          <button type="submit" className="submit-button" disabled={isLoading} >
          {isLoading ? "Loading..." : "Book appointment"}
          </button>
        </div>
          </div>
          
        </div>
       
      
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default AppointmentBooking;
