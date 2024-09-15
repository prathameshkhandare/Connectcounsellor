import React from "react";
import aboutusimg1 from "../assets/Img/aboutus-img1.jpg";
import aboutusimg2 from "../assets/Img/aboutus-img2.jpg";
import aboutusimg3 from "../assets/Img/aboutus-img3.jpg";
import "../Components/StyleSheets/Aboutus.css"; // Import your CSS file for styling

const Aboutus = () => {
  return (
    <div className="aboutus-container">
     
    <div className="about-us-descrption">
      <h3>Connect Counsellor</h3>
      <p>
      "Our platform is committed to delivering high-quality, compassionate counseling through live webinars. We connect you with experienced and certified professionals who provide expert advice on a range of topics including mental health, parenting, relationships, and personal growth. Our goal is to offer accessible and effective support in a safe, virtual environment, allowing you to gain valuable insights and practical guidance from the comfort of your home. Whether you're seeking help with managing stress, navigating family dynamics, or improving your emotional well-being, our dedicated counselors are here to support you every step of the way."</p>
    </div>
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
          <p>counsellor and psychotherapist</p>
          <div className="italic-text">
          <p>Experience counsellor and psychotherapist with more than 2 years of experience</p></div>
        </div>

        <div className="aboutus-card">
          <img src={aboutusimg2} alt="Doctor2" />
          <h3>Anupma Joshirao</h3>
          <p>counsellor</p>
          <div className="italic-text">
          <p>Experience counsellor</p></div>
        </div>
        

        <div className="aboutus-card">
          <img src={aboutusimg2} alt="Doctor3" />
          <h3>Dr. Shweta Surjuse</h3>
          <p>Counsellor</p>
          <p className="italic-text">
            "Having Experience of 2.5 years in counsellings."
          </p>
        </div>
        
        <div className="aboutus-card">
          <img src={aboutusimg2} alt="Doctor4" />
          <h3>Dr. Parimal yenkar</h3>
          <p> counsellor  </p>
          <p className="italic-text">
          having Experience with more than 3.5 years
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
