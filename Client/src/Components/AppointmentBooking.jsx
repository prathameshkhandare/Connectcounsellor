import React, { useState } from 'react';
import axios from 'axios';
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
const [paymentStatus,setPaymentStatus]=useState('')
  const token = localStorage.getItem('token');
  const [message, setMessage] = useState('');

  const API_URL ="http://localhost:3000";
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSlotSelect = (slot) => {
    if(slot <9 ){
      slot=parseInt(slot);
      slot += 12;
      console.log(slot);
    }
    setFormData({ ...formData, slot });
  };




 






  const initiatePayment = async (req,res) => {
   let receiptId = token.toString().slice(0,25);
    let price = 500;
    try {
      console.log('Creating payment order...');
      const response = await axios.post(`${API_URL}/api/create`, {
        amount:price,
        receiptId:receiptId,
      },{
        headers: {
         ' Authorization': `Bearer ${token}`,
        },
      });
      console.log('Order created:', response.data);
      const { orderId: razorpayOrderId } = response.data;
      console.log('Order created datea below');
      console.log(response.data);
      console.log('Fetching Razorpay key...');
      const keyResponse = await axios.get(`${API_URL}/api/getkey`);
      console.log('Razorpay key fetched:', keyResponse.data);
      const { key } = keyResponse.data;

      const amountInPaise = parseInt(price) * 100;
      console.log('Amount in paise:', amountInPaise);
      console.log(`${formData.reason} `)
      const options = {
        key, // Your Razorpay key ID
        amount: amountInPaise, // Amount in paise
        currency: "INR",
        name:`For booking Appointment`,
        description:`${formData.reason}`,
        order_id: razorpayOrderId,
        handler: async function (response) {
          console.log('Payment successful:', response);

          // Verify the payment with your backend
          try {
            
            console.log('Verifying payment...');
            // console.log(`${token}`)

            console.log( `${response.razorpay_payment_id},
              orderId: ${razorpayOrderId},
              signature: ${response.razorpay_signature},`)
            const paymentVerificationResponse = await axios.post(
              `${API_URL}/api/verify-payment`,
              {
                  paymentId: response.razorpay_payment_id,
                orderId: razorpayOrderId,
                signature: response.razorpay_signature,
              },{
                headers: {
                 'Authorization': `Bearer ${token}`,
                },
              }
            );
            console.log('Payment verification response:', paymentVerificationResponse.data);
            if (paymentVerificationResponse.data.success) {
              console.log('Payment verification successful.');
              setPaymentStatus('200');
            
            } else {
              console.error('Payment verification failed.');
              alert("Payment verification failed. Please try again.");
            }
          } catch (verificationError) {
            console.error('Payment verification error:', verificationError);
            alert("Payment verification failed. Please try again.");
          }
        },
        theme: {
          color: "#F37254",
        },
      };

      console.log('Opening Razorpay payment...');
      const payment = new window.Razorpay(options);
      payment.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
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

   if(!paymentStatus === '200'){
    alert ("payment failed. Please try again.");
   }
   else {
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
        // navigate('/');
        alert("Appointment booking requested successfully")
      }, 3000);
    } else if(response.status=== 409){
      setMessage("Appointment already exits");
    }
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
