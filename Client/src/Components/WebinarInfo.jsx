import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faCalendarAlt, 
  faClock, 
  faInfoCircle, 
  faLink, 
  faVideo, 
  faIdBadge, 
  faKey 
} from '@fortawesome/free-solid-svg-icons';

const WebinarInfo = () => {
  const { id } = useParams(); // Get the webinar ID from the URL parameters
  const [webinar, setWebinar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch the webinar details from the backend
    const fetchWebinar = async () => {
      try {
        console.log(id);
        const response = await axios.get(`${API_URL}/api/getwebinars/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        setWebinar(response.data);
      } catch (error) {
        if (error.response?.status === 403) {
          setError('Payment required to access this webinar.');
        } else {
          setError('Failed to load webinar details.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchWebinar();
  }, [id]);

  const handleBack = () => {
    navigate('/'); // Navigate back to the webinars list
  };

  return (
    <div className="webinar_info_container">
      {loading ? (
        <p className="webinar_info_loading">Loading...</p>
      ) : error ? (
        <p className="webinar_info_error">{error}</p>
      ) : (
        webinar && (
          <div className="webinar_info_content">
            <h2 className="webinar_info_title">{webinar.title}</h2>
            <p className="webinar_info_presenter">
              <FontAwesomeIcon icon={faUser} /> <strong>Presenter:</strong> {webinar.presenter}
            </p>
            <p className="webinar_info_label">
              <FontAwesomeIcon icon={faCalendarAlt} /> <strong>Date:</strong> {new Date(webinar.date).toLocaleDateString()}
            </p>
            <p className="webinar_info_time">
              <FontAwesomeIcon icon={faClock} /> <strong>Time:</strong> {webinar.time}
            </p>
            <p className="webinar_info_description">
              <FontAwesomeIcon icon={faInfoCircle} /> <strong>Description:</strong> {webinar.description}
            </p>
            <p className="webinar_info_link">
              <FontAwesomeIcon icon={faLink} /> <strong>Meeting Link:</strong> <a href={webinar.meetingLink} target="_blank" rel="noopener noreferrer">Join Meeting</a>
            </p>
            <p className="webinar_info_platform">
              <FontAwesomeIcon icon={faVideo} /> <strong>Platform:</strong> {webinar.platform}
            </p>
            <p className="webinar_info_meetingId">
              <FontAwesomeIcon icon={faIdBadge} /> <strong>Meeting ID:</strong> {webinar.meetingId}
            </p>
            <p className="webinar_info_meetingPass">
              <FontAwesomeIcon icon={faKey} /> <strong>Meeting Pass:</strong> {webinar.meetingPass}
            </p>
            <button className="webinar_info_back_button" onClick={handleBack}>Back to Home</button>
          </div>
        )
      )}
    </div>
  );
};

export default WebinarInfo;