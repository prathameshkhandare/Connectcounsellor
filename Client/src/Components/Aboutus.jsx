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
          <h3>Dr. Nikhil Surjuse</h3>
          <p>Founder & CEO</p>
          <p>
            Former co-founder of Connect Consellor. Experience counsellor .
          </p>
        </div>
      </div>
      <div className="slogan-section">
        <h2>MEET YOUR COUNSELLORS</h2>
      </div>

      <div className="aboutus-section">
        <div className="aboutus-card">
          <img src={aboutusimg2} alt="Doctor2" />
          <h3>Dr. Rajashree Navthale</h3>
          <p>Depression counsellor </p>
          <div className="italic-text">
          <p>Experience Depression counsellor work at connect counsellor with Experience of 3 years</p></div>
        </div>

        <div className="aboutus-card">
          <img src={aboutusimg2} alt="Doctor3" />
          <h3>Dr. Shweta Surjuse</h3>
          <p>Couple Counsellor</p>
          <p className="italic-text">
            "Having Experience of 2.5 years in counsellings."
          </p>
        </div>
        
        <div className="aboutus-card">
          <img src={aboutusimg2} alt="Doctor4" />
          <h3>Dr. Parimal yenkar</h3>
          <p>parenting counsellor having Experience with more than 3.5 years </p>
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
