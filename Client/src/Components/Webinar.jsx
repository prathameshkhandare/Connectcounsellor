import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import webinar_img from "../assets/Img/webinar_img.jpg"
import  "../Components/StyleSheets/Webinar.css"
import "./Loading";
import Loading from './Loading';
const Webinars = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedWebinar, setSelectedWebinar] = useState(null);

  const [paymentStatus, setPaymentStatus] = useState('');
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        console.log('Fetching webinars...');
        const response = await axios.get(`${API_URL}/api/getwebinar`);
        console.log('Webinars fetched:', response.data);
        
        // Only keep the last 5 webinars
        const lastFiveWebinars = response.data.slice(-5);
        setWebinars(lastFiveWebinars.reverse());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching webinars:', error);
        setError('Error fetching webinars.');
       
      } finally {
        setLoading(false);
      }
    };
    fetchWebinars();
  }, []);

  if(loading){
    return <Loading/>
  }

  const handleEnroll = async (webinar) => {
    console.log('Handling enroll for webinar:', webinar);
    setSelectedWebinar(webinar);

    try {
      // Check if the user has already paid for the webinar
      const paymentCheckResponse = await axios.post(`${API_URL}/api/checkEnrollmentStatus`, {
        webinarId: webinar._id,
      },{
        headers: { 
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Payment status:', paymentCheckResponse.data);
      if (paymentCheckResponse.data.alreadyPaid) {
        console.log('User has already paid for this webinar. Redirecting to webinar details...');
        navigate(`/webinarinfo/${webinar._id}`);
      } else {
        if (webinar.price === "0") {
          console.log('Webinar is free. Navigating to webinar details page...');
          navigate(`/webinarinfo/${webinar._id}`);
        } else {
          console.log('Webinar is paid. Initiating payment...');
          initiatePayment(webinar);
        }
      }
    } catch (error) {
      if(!token){
        navigate('/login')
      } 
      else{
        alert('Error checking payment status. Please try again.');
      }
    }
  };

  const initiatePayment = async (webinar) => {
    if (!webinar) {
      console.log('No webinar selected for payment.');
      return;
    }

    try {
      console.log('Creating payment order...');
      const response = await axios.post(`${API_URL}/api/create`, {
        amount: webinar.price,
        receiptId: webinar._id,
      },{
        headers: {
         ' Authorization': `Bearer ${token}`,
        },
      });
      console.log('Order created:', response.data);
      const { orderId: razorpayOrderId } = response.data;

      console.log('Fetching Razorpay key...');
      const keyResponse = await axios.get(`${API_URL}/api/getkey`);
      console.log('Razorpay key fetched:', keyResponse.data);
      const { key } = keyResponse.data;

      const amountInPaise = parseInt(webinar.price, 10) * 100;
      console.log('Amount in paise:', amountInPaise);

      const options = {
        key, // Your Razorpay key ID
        amount: amountInPaise, // Amount in paise
        currency: "INR",
        name: webinar.title,
        description: "Enrollment for Webinar",
        order_id: razorpayOrderId,
        handler: async function (response) {
          console.log('Payment successful:', response);

          // Verify the payment with your backend
          try {
            
            console.log('Verifying payment...');
            const paymentVerificationResponse = await axios.post(
              `${API_URL}/api/confirmpayment`,
              {
                webinarId: webinar._id,
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
              console.log('Payment verification successful. Navigating to webinar details...');
              setPaymentStatus('Payment successful!');
              navigate(`/webinarinfo/${webinar._id}`);
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

  return (
    <> 
    <div className="webinae-head-description">
    <h1 className='webinar-heading'>LIVE WEBINARS</h1>
    <p>
    "Join our live webinars for expert counseling on topics like mental health, parenting, and relationships. Get real-time advice from certified professionals!"</p>
    </div>
    <div className="webinar-outer-container">
          <div className="webinar-inner-container">
            <div className="webinar-card-container">
              <img id='webinar-meet-img' src="https://lh6.googleusercontent.com/3qQY88BkqF6IF9cBs_AGmlCh04ZaNsctNAIjuNL38qC8etWll6mSxzoDz0Ka8XVDyY-yCTcxlkNSpWHN09PbUNqh4-dB26kdswGPrpKVOIdjhYWv5UpR-TAfazI4QNJu8-nzO7o1wFA9SbtweUs7DVk" alt=""/>
              <div className='webinar-flex-container'>
              <p id='webinar-title'>
               Title of webinar
              </p>
              <i class="fa-solid fa-circle-play"></i>
              </div>
              <p id='webinar-discription'>
              <i class="fa-regular fa-lightbulb"></i> Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur nostrum assumenda ad laborum voluptatem.
              </p>
              <p id='webinar-time-date'><i class="fa-regular fa-clock"></i> time</p>
              <p id='webinar-time-date'><i class="fa-solid fa-calendar-days"></i> date</p>
              <div  className='webinar-flex-container'>
                <p id='webinar-status'>
                <i id='expired' class="fa-solid fa-circle-xmark"></i> Expired

                </p>
              
              
             
              <p id='webinar-creator'>  <i class="fa-solid fa-user-doctor"></i> name of doctor</p>
              
              </div>
              <button href="#" className='webinar-enroll-expire-btn'>Pay <i class="fa-solid fa-indian-rupee-sign"></i>499 to Enroll</button>
              



            </div>
            <div className="webinar-card-container">
              <img id='webinar-meet-img' src="https://logos-world.net/wp-content/uploads/2022/05/Google-Meet-Symbol.png" alt=""/>
              <div className='webinar-flex-container'>
              <p id='webinar-title'>
               title of webinar
              </p>
              <i class="fa-solid fa-circle-play"></i>
              </div>
              <p id='webinar-discription'>
              <i class="fa-regular fa-lightbulb"></i> Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur nostrum assumenda ad laborum voluptatem.
              </p>
              <p id='webinar-time-date'><i class="fa-regular fa-clock"></i> time</p>
              <p id='webinar-time-date'><i class="fa-solid fa-calendar-days"></i> date</p>
              <div  className='webinar-flex-container'>
                <p id='webinar-status'>
                <i id='upcoming' class="fa-solid fa-circle-check"></i> Upcomimg

                </p>
              
              
             
              <p id='webinar-creator'>  <i class="fa-solid fa-user-doctor"></i> name of doctor</p>
              
              </div>
              <button href="#" className='webinar-enroll-btn'>Pay <i class="fa-solid fa-indian-rupee-sign"></i>499 to Enroll</button>
              



            </div>
            <div className="webinar-card-container">
              <img id='webinar-meet-img' src="https://logos-world.net/wp-content/uploads/2022/05/Google-Meet-Symbol.png" alt=""/>
              <div className='webinar-flex-container'>
              <p id='webinar-title'>
               title of webinar
              </p>
              <i class="fa-solid fa-circle-play"></i>
              </div>
              <p id='webinar-discription'>
              <i class="fa-regular fa-lightbulb"></i> Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur nostrum assumenda ad laborum voluptatem.
              </p>
              <p id='webinar-time-date'><i class="fa-regular fa-clock"></i> time</p>
              <p id='webinar-time-date'><i class="fa-solid fa-calendar-days"></i> date</p>
              <div  className='webinar-flex-container'>
                <p id='webinar-status'>
                <i id='expired' class="fa-solid fa-circle-xmark"></i> Expired

                </p>
              
              
             
              <p id='webinar-creator'>  <i class="fa-solid fa-user-doctor"></i> name of doctor</p>
              
              </div>
              <button href="#" className='webinar-enroll-btn'>Pay <i class="fa-solid fa-indian-rupee-sign"></i>499 to Enroll</button>
              



            </div>

          </div>
        </div>
    </>
  );
  

  
  
};

export default Webinars;