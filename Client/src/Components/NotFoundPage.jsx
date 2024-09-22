import React from 'react';
// import './NotFoundPage.css'; // CSS file for styling
import errorImage from '../assets/Img/newerrorpage.jpg'; // Add an image for 404 (place it in the appropriate folder)
import { Link } from 'react-router-dom';
const NotFoundPage = () => {
  return (
    <div className="error_404_page-container">
      <img src={errorImage} alt="404 Not Found" className="error_404_page-image" />
            <p className="error_404_page-message">Oops! The page you're looking for doesn't exist.</p>
      <p className="error_404_page-description">
        It might have been moved or deleted.
      </p>
      <Link to="/"
      className="error_404_page-home-button">Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
