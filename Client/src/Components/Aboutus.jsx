import React from "react";
import aboutusimg1 from "../assets/Img/aboutus-img1.jpg";
import aboutusimg2 from "../assets/Img/aboutus-img2.jpg";
import aboutusimg3 from "../assets/Img/aboutus-img3.jpg";
import "../Components/StyleSheets/Aboutus.css"; // Import your CSS file for styling

const Aboutus = () => {
  return (
    <div className="aboutus-container">
     

      {/* CEO Section */}
      <div className="ceo-section">
        <img src={aboutusimg1} alt="CEO" className="ceo-image" />
        <div className="ceo-info">
          <h3>Sienna Hewitt</h3>
          <p>Founder & CEO</p>
          <p>
            Former co-founder of Opendoor. Early staff at Spotify and Clearbit.
          </p>
        </div>
      </div>
      <div className="slogan-section">
        <h2>MEET YOUR COUNSELLORS</h2>
      </div>

      <div className="aboutus-section">
        <div className="aboutus-card">
          <img src={aboutusimg2} alt="Doctor2" />
          <h3>Ashwin Santiago</h3>
          <p>Engineering Manager</p>
          <p>Lead engineering teams at Netflix, Pitch, and Protocol Labs.</p>
        </div>

        <div className="aboutus-card">
          <img src={aboutusimg2} alt="Doctor3" />
          <h3>Person Name</h3>
          <p>Job Title</p>
          <p className="italic-text">
            "An inspirational quote or line in italic."
          </p>
        </div>
        
        <div className="aboutus-card">
          <img src={aboutusimg2} alt="Doctor4" />
          <h3>Bhavesh Rathod</h3>
          <p>Senior Doctor</p>
          <p className="italic-text">
            Hr 
          </p>
        </div>
      </div>
      
      <div className="thought-section">
        <p>
          "We are a dedicated team of experienced doctors committed to providing exceptional care and support to enhance the well-being of our community."
        </p>
      </div>
    </div>
  );
};

export default Aboutus;
