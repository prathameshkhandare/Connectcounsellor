import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const WebinarInfo = () => {
    const { id } = useParams(); // Get the webinar ID from the URL parameters
    const [webinar, setWebinar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the webinar details from the backend
        const fetchWebinar = async () => {
            try {
                console.log(id);
                const response = await axios.get(`http://localhost:3000/api/getwebinars/${id}`,{
                    headers:{
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
        <div className="webinar-info">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                webinar && (
                    <div>
                        <h2>{webinar.title}</h2>
                        <p><strong>Presenter:</strong> {webinar.presenter}</p>
                        <p><strong>Date:</strong> {new Date(webinar.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {webinar.time}</p>
                        <p><strong>Description:</strong> {webinar.description}</p>
                        <p><strong>Meeting Link:</strong> <a href={webinar.meetingLink} target="_blank" rel="noopener noreferrer">Join Meeting</a></p>
                        <p><strong>Platform:</strong> {webinar.platform}</p>
                        <p><strong>Meeting ID:</strong> {webinar.meetingId}</p>
                        <p><strong>Meeting Pass:</strong> {webinar.meetingPass}</p>
                        <button onClick={handleBack}>Back to Home</button>
                    </div>
                )
            )}
        </div>
    );
};

export default WebinarInfo;
