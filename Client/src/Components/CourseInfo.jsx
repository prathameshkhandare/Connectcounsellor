import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Stylesheets/courseinfo.css";
import { useParams } from "react-router-dom";
import Loading from "./Loading"

const CourseInfo = () => {
  const [course, setCourse] = useState(null);
  const { courseId } = useParams();
  const [loading ,setLoading] = useState(true);
  const [userid, setUserid] = useState("null");

  // Store the API URL in a variable
  const API_URL = import.meta.env.VITE_API_URL;

  const userdata = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(`${API_URL}/api/userdetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.status === 200) {
        setUserid(response.data.user._id);
      }
    } catch (error) {
      console.error("There was an error fetching the user data!", error);
    }
  };

  // Function for Razorpay payment
  const handleEnrollment = async () => {
    if (!course || !userid || userid === "null") return; // Ensure both course and userId are available

    const amount = course.price; // Get the course price
    const courseId = course.id || course._id; // Ensure course.id is defined; if not, use course._id

    if (!courseId) {
      console.error("Course ID is not defined");
      return; // Exit if the course ID is not available
    }

    // Create a short receipt ID
    const receiptId = `C${courseId.substring(0, 10)}U${userid.substring(0, 10)}`; // Ensure courseId and userid are defined

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      // Call your backend to create a payment order
      const orderResponse = await axios.post(
        `${API_URL}/api/create`,
        {
          amount: amount,
          receiptId: receiptId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { orderId: razorpayOrderId } = orderResponse.data;

      // Fetch Razorpay key
      const keyResponse = await axios.get(`${API_URL}/api/getkey`);
      const { key } = keyResponse.data;

      // Initialize Razorpay
      const options = {
        key, // Your Razorpay key ID
        amount: amount * 100, // Amount in paise
        currency: "INR",
        name: course.name,
        description: "Enrollment for Course",
        order_id: razorpayOrderId,
        handler: async function (response) {
          console.log("Payment successful:", response);

          // Verify the payment with your backend
          try {
            const paymentVerificationResponse = await axios.post(
              `${API_URL}/api/verify-payment`,
              {
                paymentId: response.razorpay_payment_id,
                orderId: razorpayOrderId,
                signature: response.razorpay_signature,
              }
            );
            if (paymentVerificationResponse.data.success) {
              // Prepare enrollment data
              const enrollmentData = {
                userId: userid,
                courseId: courseId,
                courseName: course.name,
                payment: {
                  paymentId: response.razorpay_payment_id,
                  amount: amount,
                  currency: "INR",
                  orderId: razorpayOrderId,
                  status: "success",
                  paymentMethod: "Razorpay",
                },
                enrollmentDate: new Date(), // Current date
                receiptId: receiptId,
              };

              // Save enrollment data to the backend
              const enrollmentResponse = await axios.post(
                `${API_URL}/api/course-enrollment`,
                enrollmentData
              );
              console.log("Enrollment data saved:", enrollmentResponse.data);
              alert("Enrollment successful!"); // Notify the user
            } else {
              alert("Payment verification failed. Please try again.");
            }
          } catch (verificationError) {
            console.error("Payment verification error:", verificationError);
            alert("Payment verification failed. Please try again.");
          }
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error creating payment order:", error);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log("Fetching course with courseId:", courseId);
        const response = await axios.get(
          `${API_URL}/api/courses/read/${courseId}`
        );
        console.log("Response:", response.data);
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course:", error);
        setLoading(false);
      }
    };
    fetchCourse();
    userdata();
  }, [courseId]);

  if (!course) {
    return <div><Loading/></div>;
  }

  return (
    <div className="course-details-by-id-outer-container">
    <h1 className="course-details-by-id-outer-container-h1">
      {course.name}
    </h1>
    <p className="course-details-by-id-outer-container-p">
      {course.shortdescription}
    </p>
    <div className="course-details-by-id-inner-container">
      <div className="course-details-by-id-flex-container1">
      <div className="course-image">
  {course.youtubeLink ? (
    <iframe
    id="course-video"
      src={course.youtubeLink.replace("watch?v=", "embed/")}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  ) : (
    <img src={course.image} alt={course.name} />
  )}
</div>
        <div className="course-details-by-id-flex">
          <h1 id="course-details-by-id-head">{course.name}</h1>
          {course.price>0?
          <p>
            <i class="fa-solid fa-indian-rupee-sign"></i>{course.price}
          </p>
          :
          <p>
          Free
        </p>

          }
        </div>

        <p id="course-details-by-id-description">
          {course.shortdescription }
        </p>
        <p id="course-details-by-id-created">Created by {course.author ? course.author : 'Unknown'}</p>
        <p id="course-details-by-id-posted">
          <i class="fa-solid fa-circle-exclamation"></i> Posted On  {course.date ?course.date.split("T")[0]:"--"}
        </p>
        <p id="course-details-by-id-star">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </p>
        <div>
          <h1 id="course-details-by-id-des-head">Description</h1>
          <p id="course-details-by-id-description-long">
            {course.description}
          </p>
        </div>
      </div>
      <div className="course-details-by-id-flex-container2">
        <div className="course-details-by-id-flex-inner1-container2">
        <h1>Category</h1>
        <p>{course.category}</p>
          <h1 className='course-details-by-id-flex-inner1-container2-h1'>Topics Covered</h1>

          {course.content.map((topic, index) => (
        <p key={index}>
          <i id="topic-icon" className="fa-solid fa-folder"></i> {topic}
        </p>
      ))}


        </div>
        <div className="course-details-by-id-flex-inner2-container2">
          {course.price>0?
          <button className="course-details-by-id-flex-inner2-container2-btn" onClick={handleEnrollment}>
          Enroll Course
        </button>
        :
        <button className="course-details-by-id-flex-inner2-container2-btn">
            Free Course
          </button>  
        
        
        
        }
        </div>
      </div>
    </div>
 


  </div>
  )}
export default CourseInfo;
