import React, { useEffect } from "react";
import mindTherapy from "../assets/Img/mindTherapy.webp";
import doctorsymbol from "../assets/Img/doctor_symbol2.jpg"
import ccadvertise from "../assets/Img/connectcounselloradvertise.png"

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
    <>
    
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
    {/* <img src={ccadvertise} className="connectcounselloradvertise" alt="" /> */}

    {/* new one  */}

    <div className='main-container'>
    <div className='trust-outer-container'>
        <h1>Why you should trust us?</h1>
        <h1>
          Get know about us
        </h1>
        <div className='trust-inner-container'>
          <div className='trust-inner-flex-container'>
          <i class="fa-solid fa-user-doctor"></i>
          <p className='bold'>All Specialist</p>
          <p className='thin2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, quae.</p>

          </div>
          <div className='trust-inner-flex-container'>
          <i class="fa-solid fa-user-doctor"></i>
          <p className='bold'>Private & secure</p>
          <p className='thin2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, quae.</p>

          </div>
          <div className='trust-inner-flex-container'>
          <i class="fa-solid fa-user-doctor"></i>
          <p className='bold'>Trusted by users</p>
          <p className='thin2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, quae.</p>

          </div>
          <div className='trust-inner-flex-container'>
          <i class="fa-solid fa-user-doctor"></i>
          <p className='bold'>24x7 support</p>
          <p className='thin2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, quae.</p>

          </div>

        </div>


      </div>
     
      <div  className='steps-outer-container'>
        <div className='steps-outer-flex-container'>
        <div  className='steps-inner-container1'>
          <p>Our Appoinment Booking process</p>
          <h1>Four easy steps to get your solution</h1>

        </div>
        <div  className='steps-inner-container2'>
          <div className='steps-inner-flex-container2'>
            <h1>1</h1>
            <i class="fa-solid fa-stethoscope"></i>
            <p className='bold-white'>Search Doctor</p>
            <p className='thin-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste repellendus ipsa culpa!</p>

          </div>
          <div className='steps-inner-flex-container2'>
            <h1>2</h1>
            <i class="fa-solid fa-stethoscope"></i>
            <p className='bold-white'>Search Doctor</p>
            <p className='thin-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste repellendus ipsa culpa!</p>

          </div>
          <div className='steps-inner-flex-container2'>
            <h1>3</h1>
            <i class="fa-solid fa-stethoscope"></i>
            <p className='bold-white'>Search Doctor</p>
            <p className='thin-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste repellendus ipsa culpa!</p>

          </div>
          <div className='steps-inner-flex-container2'>
            <h1>4</h1>
            <i class="fa-solid fa-stethoscope"></i>
            <p className='bold-white'>Search Doctor</p>
            <p className='thin-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste repellendus ipsa culpa!</p>

          </div>

        </div>

        </div>
        

      </div>

      <div  className='our-speciality-outer-container'>
        <p style={{color:'blue'}}>Our Speciality</p>
        <h1>
          We provide following counselling services with best counsellor team!
        </h1>
        <div className='our-speciality-inner-container'>
          <div className='our-speciality-container' >
          <i class="fa-solid fa-face-sad-tear"></i>
          <p className='bold'>Depression</p>
          <p className='thin'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quaerat veniam illo.</p>

          </div>
          <div className='our-speciality-container' >
          <i class="fa-solid fa-face-sad-tear"></i>
          <p className='bold'>Depression</p>
          <p className='thin'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quaerat veniam illo.</p>

          </div>
          <div className='our-speciality-container' >
          <i class="fa-solid fa-face-sad-tear"></i>
          <p className='bold'>Depression</p>
          <p className='thin'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quaerat veniam illo.</p>

          </div>
          <div className='our-speciality-container' >
          <i class="fa-solid fa-face-sad-tear"></i>
          <p className='bold'>Depression</p>
          <p className='thin'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quaerat veniam illo.</p>

          </div>
          <div className='our-speciality-container' >
          <i class="fa-solid fa-face-sad-tear"></i>
          <p className='bold'>Depression</p>
          <p className='thin'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quaerat veniam illo.</p>

          </div>
        </div>
        

      </div>
     
    </div>
    </>
  );
}

export default Banner;
