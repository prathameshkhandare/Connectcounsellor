import React from 'react';
import '../Components/StyleSheets/Aboutus.css'; // Import your CSS file for styling

const Aboutus = () => {
  return (
    <div className="aboutus-container">
      <div className="slogan-section">
        <h2>Mind Therapy for a Balanced Life</h2>
      </div>
      <div className="aboutus-section">
        <div className="aboutus-left">
          <img src="/path/to/your/image.jpg" alt="Mind Therapy" />
        </div>
        <div className="aboutus-right">
          <h3>About Mind Therapy</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit augue eu est dapibus, vel venenatis justo consequat. Nulla convallis magna vitae magna tempus, in auctor justo tempus.
          </p>
        </div>
      </div>
      <div className="aboutus-section">
        <div className="aboutus-left">
          <h3>Our Approach</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit augue eu est dapibus, vel venenatis justo consequat. Nulla convallis magna vitae magna tempus, in auctor justo tempus.
          </p>
        </div>
        <div className="aboutus-right">
          <img src="/path/to/your/image2.jpg" alt="Our Approach" />
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
