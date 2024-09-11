import React from 'react';
import './Stylesheets/AppInfo.css';



import app_info_1 from "../assets/Img/app-info-1n.png";
import Appinfo from "../assets/Img/appInfo.png"


const AppInfo = () => {
  return (
    <div className="app-info">
      <div className="app-content">
        <h2>Get the Connect Counsellor App</h2>
        <p>Get access to mind therapy courses anywhere, anytime</p>
        <ul>
          <li> Browse through a wide range of courses</li>
          <li> Enroll and start learning instantly</li>
          <li> Track your progress on the go</li>
          <li> Download course materials with a single tap</li>
        </ul>
        <div className="app-store-buttons">
          <a href="#">
            <img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" alt="Google Play" className='Android-play-store' />
          </a>
         
        </div>
      </div>
      <div className="app-images">
        <img src={Appinfo} alt="App Image 1" />
        {/* <img src={app_info_2} alt="App Image 2" /> */}
      </div> 
      <div className="app-store-logo">
        {/* <img src={logo} alt="Counsillhub Logo" /> */}
      </div>
    </div>
  );
};

export default AppInfo;
