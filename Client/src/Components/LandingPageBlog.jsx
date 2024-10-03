import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Components/StyleSheets/LandingPageBlogs.css"

const LandingPageBlog = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [webinars, setWebinars] = useState([]);
  const blogRef = useRef([]);

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/blog/read`);
        setWebinars(response.data);
      } catch (error) {
        console.error("Error fetching webinars:", error);
      }
    };
    fetchWebinars();
  }, [API_URL]);

  useEffect(() => {
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-blog"); // Add animation class when in view
        }
      });
    });

    // Observe each blog card
    blogRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Cleanup observer on unmount
    return () => {
      blogRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [webinars]);

  return (
    <div className="blogs-landingpage-outer-container">
      <h1>Read Our Blogs</h1>
      <p id="blog-findblog-discription">
        You can find the latest blogs posted by the Connect Counsellor team here:
      </p>
      <div className="blogs-landingpage-inner-container">
        {webinars.slice().reverse().slice(0, 3).map((webinar, index) => (
          <div
            key={webinar._id}
            className="blogs-landingpage-blogcard-container"
            ref={(el) => (blogRef.current[index] = el)} // Attach each blog card to a ref
          >
            <img
              src={webinar.image || "https://t3.ftcdn.net/jpg/05/71/06/04/360_F_571060419_Owx0HieYkYocICzV4W7IxmXpdmP1xo7F.jpg"}
              alt=""
            />
            <div style={{ padding: "10px" }}>
              <p id="blog-category">{webinar.category || "Uncategorized"}</p>
              <p id="blog-topic">{webinar.title}</p>
              <p id="blog-content">
                {webinar.shortDescription}
                <Link to="/blog">
                  <span id="blog-read-more">Read more</span>
                </Link>
              </p>
              <div className="blogs-landingpage-flex-date-container">
                <p id="blog-author">
                  <i className="fa-solid fa-user-doctor"></i>{" "}
                  {webinar.author || "Unknown Author"}
                </p>
                <p id="blog-date">{new Date(webinar.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPageBlog;
