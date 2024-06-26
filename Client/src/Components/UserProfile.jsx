import React, { useState } from 'react';
import "../Components/StyleSheets/UserProfile.css";
// import profilepic from "../assets/Img/profile.jpg"

import { Link } from 'react-router-dom';

function UserProfile() {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    hobby: '',
    language: 'English (US)',
    website: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  return (
    <div className="profile-container">
      <aside className="profile-sidebar">
        <div className="profile-pic">Br</div>
        <div className="profile-name">Bhavesh Vinod Rathod</div>
        <ul className="profile-menu">
          <li className="active">Profile</li>
          
          <li>Account Security</li>
          <li>Payment methods</li>
          <li>Privacy</li>
          <li>Notifications</li>
          <li>Close account</li>
        </ul>
      </aside>
      <main className="profile-main">
        <h2>Public profile</h2>
        <p>Add information about yourself</p>
        <form>
          <div className="form-group">
            <label>Basics:</label>
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <input
              type="text"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Email"
              maxLength="60"
            />
          </div>
          <div className="form-group">
            <label>Add a hobbies:</label>
            <textarea
              name="hobby"
              value={profile.hobby}
              onChange={handleChange}
              placeholder="Hobbies"
            />
          </div>
          <div className="form-group">
            <label>Language:</label>
            <select
              name="language"
              value={profile.language}
              onChange={handleChange}
            >
              <option value="English (US)">English (US)</option>
              <option value="English (UK)">English (UK)</option>
              {/* Add more language options as needed */}
            </select>
          </div>
        </form>
      </main>
    </div>
  );
}

export default UserProfile;
