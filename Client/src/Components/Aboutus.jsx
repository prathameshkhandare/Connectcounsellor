import React from 'react';
import aboutusimg1 from "../assets/Img/aboutus-img1.jpg";
import aboutusimg2 from "../assets/Img/aboutus-img2.jpg";
import '../Components/StyleSheets/Aboutus.css'; // Import your CSS file for styling

const Aboutus = () => {
  return (
    <div className="aboutus-container">
      <div className="slogan-section">
        <h2>Mind Therapy for a Balanced Life</h2>
      </div>
      <div className="aboutus-section">
        <div className="aboutus-left">
          <img src={aboutusimg1} className='aboutus-left-img' alt="Mind Therapy" />
        </div>
        <div className="aboutus-right">
          <h3>Founder </h3>
          <h3>Nikhil Surjuse </h3>
          <p>
            Welcome to Mind Therapy, an initiative I founded with a deep commitment to promoting mental well-being and holistic healing. After spending over four decades as an IAS officer, my journey took a transformative turn as I delved into the realms of spirituality and meditation. With over 22 years of meditation practice and authoring four books on spirituality and the philosophy of life, I realized the profound impact mental wellness has on our overall quality of life. Mind Therapy is the culmination of this journey, dedicated to providing accessible, effective solutions for mental health conditions.
          </p>
        </div>
      </div>
      <div className="aboutus-section">
        <div className="aboutus-left">
          <h3>Our Events</h3>
          <p>
            Mind Therapy is designed to be a comprehensive platform where experienced practitioners and experts collaborate to offer personalized advice, counseling, and treatment. Our web portal offers free mental health assessment tests to help clients identify their needs and receive guidance on the best intervention strategies. Understanding the growing challenges of modern life, we emphasize holistic healing by integrating allopathy-based solutions with scientifically proven alternative and integrative methods. 
          </p>
        </div>
        <div className="aboutus-right">
          <img src={aboutusimg2} className='aboutus-right-img' alt="our Events" />
        </div>
      </div>
      <div className="thought-section">
        <p>
          "Mind Therapy is not just about healing the mind; it's about nurturing the soul. Our goal is to help individuals find balance and peace in their lives through a combination of traditional and holistic practices. We believe that mental well-being is the cornerstone of a fulfilling life, and we are dedicated to supporting our clients on their journey to wellness."
        </p>
      </div>
    </div>
  );
};

export default Aboutus;
