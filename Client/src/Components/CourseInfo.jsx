import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Stylesheets/courseinfo.css';
import { useParams } from 'react-router-dom';

const CourseInfo = () => {
  const [course, setCourse] = useState(null);
  const { courseId } = useParams();
  const [userid, setUserid] = useState("null");

    const userdata = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.get('http://localhost:3000/api/userdetails', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(response.data.user)?
            if(response.status === 200) {
              setUserid(response.data.user._id);
            
             
              
            }

         
           
           
        } catch (error) {
            console.error('There was an error fetching the user data!', error);
        } 
    };

   


// console.log(userid)


//function for razorpayment
const handleEnrollment = async () => {
  if (!course || !userid || userid === "null") return;  // Ensure both course and userId are available

  const amount = course.price; // Get the course price
  // Ensure course.id is defined; if not, use course._id
  const courseId = course.id || course._id;
  
  if (!courseId) {
    console.error('Course ID is not defined');
    return; // Exit if the course ID is not available
  }

  // Create a short receipt ID
  const receiptId = `C${courseId.substring(0, 10)}U${userid.substring(0, 10)}`; // Ensure courseId and userid are defined

  try {
    // Call your backend to create a payment order
    const response = await axios.post('http://localhost:3000/api/create', {
      amount: amount,
      receiptId: receiptId,
    });
    const { orderId: razorpayOrderId } = response.data;

    // Initialize Razorpay
    const options = {
      key: "rzp_test_uaB0T3msRybpD8", // Your Razorpay key ID
      amount: amount, // Amount in paise
      currency: 'INR',
      name: course.name,
      description: 'Enrollment for Course',
      order_id: razorpayOrderId,
      handler: async function (response) {
        console.log('Payment successful:', response);

        // Prepare enrollment data
        const enrollmentData = {
          userId: userid,
          courseId: courseId,
          courseName: course.name,
          payment: {
            paymentId: response.razorpay_payment_id,
            amount: amount,
            currency: 'INR',
            orderId: razorpayOrderId,
            status: 'success',
            paymentMethod: 'Razorpay',
          },
          enrollmentDate: new Date(), // Current date
          receiptId: receiptId,
         // Replace with the promo code if applicable
        };

        try {
          // Save enrollment data to the backend
          console.log(enrollmentData);
          const enrollmentResponse = await axios.post('http://localhost:3000/api/course-enrollment', enrollmentData);
          console.log('Enrollment data saved:', enrollmentResponse.data);
          alert('Enrollment successful!'); // Notify the user
        } catch (enrollmentError) {
          console.error('Error saving enrollment data:', enrollmentError);
          alert('Enrollment failed. Please try again.');
        }
      },
      theme: {
        color: '#F37254',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error('Error creating payment order:', error);
  }
};






  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log('Fetching course with courseId:', courseId);
        const response = await axios.get(`http://localhost:3000/api/courses/read/${courseId}`);
        console.log('Response:', response.data);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
    userdata();
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-info-container">
      <div className="course-details">
        <div className="course-header">
          <h1 className="course-title">{course.name}</h1>
          <p className="course-subtitle">{course.shortdescription}</p>
        </div>
        <div className="course-image">
          <img src={course.image} alt={course.name} />
        </div>
        <div className="course-content">
          <h1 className="course-title">What You Will Learn</h1>
          <ul className="course-learn-list">
            {course.content && course.content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="course-content">
            <h1 className='course-title'> Course Description</h1>
          <p className="course-description">{course.description}</p>
        </div>
      </div>
      <div className="course-sidebar">

      
        <div className="course-instructor">
          <h3>price</h3>
          <p>{course.price}</p>
        </div>
        <div className="course-ratings">
          <h3>Rating</h3>
          <p>4.7 (209,135 ratings)</p>
        </div>
        <div className="course-students">
          <h3>Students</h3>
          <p>975,558</p>
        </div>
        <div className="course-action">
          <button className="btn btn-primary" onClick={handleEnrollment}>Enroll Now</button>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
