import React, { useEffect } from "react";
import mindTherapy from "../assets/Img/mindTherapy.webp";
import doctorsymbol from "../assets/Img/doctor_symbol2.jpg";
import ccadvertise from "../assets/Img/connectcounselloradvertise.png";

const animateText = (text) => {
  return text.split(" ").map((word, index) => (
    <span
      key={index}
      className="animated-word"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {word}&nbsp; {/* Add a non-breaking space after each word */}
    </span>
  ));
};

function Banner() {
  useEffect(() => {
    const bannerContainer = document.querySelector(".banner-container");
    bannerContainer.classList.add("active"); 
  }, []);

  return (
    <>
      <div className="banner-container">
        <div className="quote">
          <p className="quote-text">
            "Your mental health is a priority. Take care of yourself first,
            because when you're at your best, everyone around you benefits too."
          </p>
        </div>
        <div className="banner-content">
          <div className="banner-text">
            <h2>{animateText("Welcome to Connect Counsellor")}</h2>
            <p>
              {animateText(
                "your trusted destination for expert courses and personalized counseling sessions !"
              )}
            </p>
            <button
              className="get-started-btn"
              onClick={() => window.scrollBy(0, window.innerHeight * 0.78)}
            >
              Let's Get Started
            </button>
          </div>
          <div className="banner-image">
            <img src={mindTherapy} className="mhealth-img" alt="mind therapy" />
          </div>
        </div>
      </div>
      {/* <img src={ccadvertise} className="connectcounselloradvertise" alt="" /> */}

      {/* new one  */}

      <div className="main-container">
        <div className="trust-outer-container">
          <h1>Why you should trust us?</h1>
          <h1>Get know about us</h1>
          <div className="trust-inner-container">
            <div className="trust-inner-flex-container">
              <i class="fa-solid fa-user-md"></i> {/* All Specialist */}
              <p className="bold">All Specialists</p>
              <p className="thin2">
                "Certified and experienced counselors specialized in counseling
                ensuring you receive the best care possible."
              </p>
            </div>
            <div className="trust-inner-flex-container">
              <i class="fa-solid fa-lock"></i> {/* Private & Secure */}
              <p className="bold">Private & Secure</p>
              <p className="thin2">
                "Your privacy is our top priority. We ensure all counseling
                sessions are confidential, safe, and secure, respecting your
                personal space."
              </p>
            </div>
            <div className="trust-inner-flex-container">
              <i class="fa-solid fa-thumbs-up"></i> {/* Trusted by Users */}
              <p className="bold">Trusted by Users</p>
              <p className="thin2">
                "Thousands of clients trust us to guide them through their
                emotional challenges, strengthening their mental well-being."
              </p>
            </div>
            <div className="trust-inner-flex-container">
              <i class="fa-solid fa-headset"></i> {/* 24x7 Support */}
              <p className="bold">24x7 Support</p>
              <p className="thin2">
                "We’re here for you whenever you need us. Our counselors are
                available around the clock to provide support and guidance."
              </p>
            </div>
          </div>
        </div>

        <div className="steps-outer-container">
          <div className="steps-outer-flex-container">
            <div className="steps-inner-container1">
              <p>Our Appoinment Booking process</p>
              <h1>Four easy steps to get your solution</h1>
            </div>
            <div className="steps-inner-container2">
              <div className="steps-inner-flex-container2">
                <h1>1</h1>
                <i class="fa-solid fa-stethoscope"></i>
                <p className="bold-white">Enroll in Courses</p>
                <p className="thin-white">
                  Sign up for the courses that fit your needs.
                </p>
              </div>
              <div className="steps-inner-flex-container2">
                <h1>2</h1>
                <i class="fa-solid fa-stethoscope"></i>
                <p className="bold-white">Access Course Materials</p>
                <p className="thin-white">
                  Receive detailed information about your enrolled course.
                </p>
              </div>
              <div className="steps-inner-flex-container2">
                <h1>3</h1>
                <i class="fa-solid fa-stethoscope"></i>
                <p className="bold-white">Attend Sessions</p>
                <p className="thin-white">
                  Get session details sent to your email.
                </p>
              </div>
              <div className="steps-inner-flex-container2">
                <h1>4</h1>
                <i class="fa-solid fa-stethoscope"></i>
                <p className="bold-white">Meet Your Counselor</p>
                <p className="thin-white">
                  Engage with your counselor during scheduled sessions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="our-speciality-outer-container">
          <p style={{ color: "#007bff" }}>Our Speciality</p>
          <h1>
            We provide following counselling services with best counsellor team!
          </h1>
          <div className="our-speciality-inner-container">
            <div className="our-speciality-container">
              <i class="fa-solid fa-face-frown"></i>
              <p className="bold">Depression</p>
              <p className="thin">
                Struggling with feelings of sadness or hopelessness? Our
                counselors offer support and coping strategies to help manage
                and overcome depression.
              </p>
            </div>
            <div className="our-speciality-container">
              <i class="fa-solid fa-child"></i>
              <p className="bold">Parenting</p>
              <p className="thin">
                Navigating the challenges of parenting can be tough. We provide
                guidance to help you raise emotionally healthy and resilient
                children. Raise great Child!
              </p>
            </div>
            <div className="our-speciality-container">
              <i class="fa-solid fa-heart"></i>
              <p className="bold">Couple</p>
              <p className="thin">
                Strengthen your relationship with personalized counseling
                sessions that address communication, conflict resolution, and
                intimacy.
              </p>
            </div>
            <div className="our-speciality-container">
              <i class="fa-solid fa-venus-mars"></i>
              <p className="bold">Sexual Wellness</p>
              <p className="thin">
                Address concerns about sexual health, intimacy, and relationship
                satisfaction in a safe, open, and non-judgmental environment
                with the help of our trained specialists.
              </p>
            </div>
            <div className="our-speciality-container">
              <i class="fa-solid fa-face-meh"></i>

              <p className="bold">Anxiety</p>
              <p className="thin">
                Overwhelmed by stress or constant worry? Our experts provide
                tools and techniques to help manage anxiety and regain control
                of your life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
