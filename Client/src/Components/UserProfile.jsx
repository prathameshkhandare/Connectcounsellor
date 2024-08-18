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
    DOB: '',
    Address: '',
    Gender: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/user/profile/read', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = response.data;
        console.log('User profile:', data);
        setProfile({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          hobby: data.hobby || '',
          language: data.language || 'English (US)',
          DOB:data.DOB ? data.DOB.split('T')[0] : '',
          Address: data.Address || '',
          Gender: data.Gender || '',
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

    try {
      const token = localStorage.getItem('token');
   
      const response = await axios.post(
        'http://localhost:3000/api/user/profile/write',
        profile,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage('Profile saved successfully!');
      } else {
        console.log(response.message);
        console.log("response not okey")
        setMessage('Error in saving profile');
      }

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
            <span>{getInitials()}</span>
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
              disabled
            />
          </div>
          <div className="form-group">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="DOB"
              value={profile.DOB}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <textarea
              name="Address"
              value={profile.Address}
              onChange={handleChange}
              placeholder="Address"
            />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <select
              name="Gender"
              value={profile.Gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Add a hobby:</label>
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
