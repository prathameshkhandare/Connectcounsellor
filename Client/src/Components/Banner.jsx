import React from "react";
import mhealth from "../assets/Img/mental-health.jpg";


function Banner() {
  return (
    <div className="banner-container">
      <img src={mhealth} className="mhealth-img" alt="mental health" />
    </div>
  );
}

export default Banner;
