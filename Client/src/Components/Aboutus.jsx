import React, { useEffect, useRef } from "react";
import "../Components/StyleSheets/Aboutus.css"; // Import your CSS file for styling

const Aboutus = () => {
  const aboutusRef = useRef(null);

  // for animation

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-counsellor-card");
        }
       
      });
    
    }, 
    {
      threshold:0.5,
    });

    const cards = document.querySelectorAll(".aboutus-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="aboutus-container">
      <div className="about-us-descrption">
        <h3>Connect Counsellor</h3>
        <p>
          "Our platform is committed to delivering high-quality, compassionate
          counseling through live webinars. We connect you with experienced and
          certified professionals who provide expert advice on a range of topics
          including mental health, parenting, relationships, and personal growth.
          ..."
        </p>
      </div>

      {/* CEO Section */}
      <div className="ceo-section">
        <img
          src="https://static.vecteezy.com/system/resources/previews/036/594/092/original/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
          alt="CEO"
          className="ceo-image"
        />
        <div className="ceo-info">
          <h3>Nikhil Surjuse</h3>
          <p>Founder & CEO</p>
          <p>Founder of Connect Counsellor. Experience counsellor.</p>
        </div>
      </div>

      <div className="slogan-section">
        <h2>MEET YOUR COUNSELLORS</h2>
      </div>

      <div className="aboutus-section" ref={aboutusRef}>
        <div className="aboutus-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQoCdGQriUwz_gtaESlzplgRlBf4K3PQ4ffNA9O3-6jh3nMrngcpdl-cEdSLaIyOC3v68&usqp=CAU"
            alt="Doctor2"
          />
          <h3> Rajashree Navthale</h3>
          <p>counsellor and psychotherapist</p>
          <div className="italic-text">
            <p>Experience counsellor and psychotherapist with more than 2 years of experience</p>
          </div>
        </div>

        <div className="aboutus-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQoCdGQriUwz_gtaESlzplgRlBf4K3PQ4ffNA9O3-6jh3nMrngcpdl-cEdSLaIyOC3v68&usqp=CAU"
            alt="Doctor2"
          />
          <h3>Anupma Joshirao</h3>
          <p>counsellor</p>
          <div className="italic-text">
            <p>Experienced counsellor</p>
          </div>
        </div>

        <div className="aboutus-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQoCdGQriUwz_gtaESlzplgRlBf4K3PQ4ffNA9O3-6jh3nMrngcpdl-cEdSLaIyOC3v68&usqp=CAU"
            alt="Doctor3"
          />
          <h3>Shweta Surjuse</h3>
          <p>Counsellor</p>
          <p className="italic-text">"Having Experience of 2.5 years in Counselling."</p>
        </div>

        <div className="aboutus-card">
          <img
            src="https://static.vecteezy.com/system/resources/previews/036/594/092/original/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
            alt="Doctor4"
          />
          <h3>Dr. Parimal Yenkar</h3>
          <p>counsellor</p>
          <p className="italic-text">Having experience of more than 3.5 years</p>
        </div>
      </div>

      <div className="thought-section">
        <p>
          "We are a dedicated team of experienced doctors committed to providing
          exceptional care and support to enhance the well-being of our
          community."
        </p>
      </div>
    </div>
  );
};

export default Aboutus;
