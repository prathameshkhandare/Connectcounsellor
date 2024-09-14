import React from 'react';
import '../Components/StyleSheets/Loading.css'; // 

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
      <p className="loading-text">We're here to help... Loading</p>
    </div>
  );
};

export default Loading;
