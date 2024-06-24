import React from 'react';
import './Stylesheets/AppInfo.css';
import app_info_1 from "../assets/Img/app-info-1.jpg";
import app_info_2 from "../assets/Img/app-info-2.jpg";
// import logo from "../assets/Img/counsillhub-logo.png";

const AppInfo = () => {
  return (
    <div className="app-info">
      <div className="app-content">
        <h2>Get the Counsillhub App</h2>
        <p>Get access to mind therapy courses anywhere, anytime</p>
        <ul>
          <li><i className="fas fa-star"></i> Browse through a wide range of courses</li>
          <li><i className="fas fa-star"></i> Enroll and start learning instantly</li>
          <li><i className="fas fa-star"></i> Track your progress on the go</li>
          <li><i className="fas fa-star"></i> Download course materials with a single tap</li>
        </ul>
        <div className="app-store-buttons">
          <a href="#">
            <img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" alt="Google Play" />
          </a>
          <a href="#">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvzJASvP_DUtrXr3e-pFLajZYQ8NUOP-g46g&s" alt="App Store" />
          </a>
        </div>
      </div>
      <div className="app-images">
        <img src={app_info_1} alt="App Image 1" />
        {/* <img src={app_info_2} alt="App Image 2" /> */}
      </div>
      <div className="app-store-logo">
        {/* <img src={logo} alt="Counsillhub Logo" /> */}
      </div>
    </div>
  );
};

export default AppInfo;
