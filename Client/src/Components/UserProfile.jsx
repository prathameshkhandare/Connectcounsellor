import React, { useEffect, useState } from 'react';
import "../Components/StyleSheets/UserProfile.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
  const [message, setMessage] = useState('');
  
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    hobby: '',
    language: 'English (US)',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const API_URL = import.meta.env.VITE_API_URL; // Define the base API URL
      
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/user/profile/read`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        setProfile({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          hobby: data.hobby || '',
          language: data.language || 'English (US)',
        });
      } catch (error) {
        console.log('Error in fetching user profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const getInitials = () => {
    const { firstName, lastName } = profile;
    const firstInitial = firstName ? firstName.charAt(0) : '';
    const lastInitial = lastName ? lastName.charAt(0) : '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const API_URL = import.meta.env.VITE_API_URL; // Define the base API URL

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/user/profile/write`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      const data = await response.json();
      setMessage('Profile saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.log('Error in saving profile:', error);
      setMessage('Error in saving profile');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="profile-container">
      <aside className="profile-sidebar">
        <div className="profile-pic-container">
          <div className="profile-pic">
            {profile.profilePic ? (
              <img src={profile.profilePic} alt="Profile" />
            ) : (
              <span>{getInitials()}</span>
            )}
            <div className="profile-pic-overlay">Select Image</div>
          </div>
        </div>
        <div className="profile-name">{`${profile.firstName} ${profile.lastName}`}</div>
        <ul className="profile-menu">
          <li className="profile-menu-links"><Link to="/Profile">Profile</Link></li>
          <li className="profile-menu-links"><Link to="/account-setting">Account Security</Link></li>
          <li className="profile-menu-links"><Link to="/Notifications">Notifications</Link></li>
          <li className="profile-menu-links"><Link to="/UserCourses">My courses</Link></li>
        </ul>
      </aside>
      <main className="profile-main">
        <h2>Public profile</h2>
        <p>Add information about yourself</p>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Basics:</label>
            <input
              type="text"
              name="firstName"
              value={profile.firstName || ''}
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={profile.lastName || ''}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <input
              type="text"
              name="email"
              value={profile.email || ''}
              onChange={handleChange}
              placeholder="Email"
              maxLength="60"
            />
          </div>
          <div className="form-group">
            <label>Add a hobby:</label>
            <textarea
              name="hobby"
              value={profile.hobby || ''}
              onChange={handleChange}
              placeholder="Hobbies"
            />
          </div>
          <div className="form-group">
            <label>Language:</label>
            <select
              name="language"
              value={profile.language || 'English (US)'}
              onChange={handleChange}
            >
              <option value="English (US)">English (US)</option>
              <option value="English (UK)">English (UK)</option>
            </select>
          </div>
          <button type="submit">Save</button>
          <div className={`message-container ${message ? 'visible' : ''}`}>
            {message}
          </div>
        </form>
      </main>
    </div>
  );
}

export default UserProfile;
