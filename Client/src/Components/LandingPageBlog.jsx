import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Components/StyleSheets/LandingPageBlogs.css"

const LandinPageBlog = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [webinars, setWebinars] = useState([]);

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

  return (
    <>
      <div className="blogs-landingpage-outer-container">
        <h1>Read Our Blogs</h1>
        <p id="blog-findblog-discription">
          You can find the latest blogs posted by the Connect Counsellor team here:
        </p>
        <div className="blogs-landingpage-inner-container">
          {webinars.slice().reverse().slice(0, 3).map((webinar) => (
            <div key={webinar._id} className="blogs-landingpage-blogcard-container">
              <img src={webinar.image || "https://t3.ftcdn.net/jpg/05/71/06/04/360_F_571060419_Owx0HieYkYocICzV4W7IxmXpdmP1xo7F.jpg"} alt="" />
              <div style={{ padding: '10px' }}>
                <p id="blog-category">{webinar.category || "Uncategorized"}</p>
                <p id="blog-topic">{webinar.title}</p>
                <p id="blog-content">
                  {webinar.shortDescription}
                 <a href="/blog"> <span id="blog-read-more" >Read more</span></a>
                </p>
                <div className="blogs-landingpage-flex-date-container">
                  <p id="blog-author">
                    <i className="fa-solid fa-user-doctor"></i> {webinar.author || "Unknown Author"}
                  </p>
                  <p id="blog-date">{new Date(webinar.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default LandinPageBlog;
