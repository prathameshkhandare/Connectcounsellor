import React, { useEffect } from "react";
import mindTherapy from "../assets/Img/mindTherapy.webp";

const animateText = (text) => {
  return text.split(" ").map((word, index) => (
    <span key={index} className="animated-word" style={{ animationDelay: `${index * 0.2}s` }}>
      {word}&nbsp; {/* Add a non-breaking space after each word */}
    </span>
  ));
};

function Banner() {
  useEffect(() => {
    const bannerContainer = document.querySelector(".banner-container");
    bannerContainer.classList.add("active"); // Add 'active' class to trigger animations
  }, []);

  return (
    <div className="banner-container">
      <div className="quote">
        <p className="quote-text">"Your mental health is a priority. Take care of yourself first, because when you're at your best, everyone around you benefits too."</p>
      </div>
      <div className="banner-content">
        <div className="banner-text">
          <h1>{animateText("Welcome to Counselling Hub")}</h1>
          <p>{animateText("your trusted destination for expert courses and personalized counseling sessions !")}</p>
          <button className="get-started-btn" onClick={() => window.scrollBy(0, window.innerHeight * 0.78)}>Let's Get Started</button>

        </div>
        <div className="banner-image">
          <img src={mindTherapy} className="mhealth-img" alt="mind therapy" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
