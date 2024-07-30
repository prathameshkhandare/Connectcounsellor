import React, { useEffect, useState } from 'react';
import "../Components/StyleSheets/UserProfile.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    hobby: '',
    language: 'English (US)',
    // profilePic: ''
  });

  // const [isPicSet, setIsPicSet] = useState(false);

  useEffect(() => {
    const userDetails = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      if (token) {
        try {
          // Send a request to backend to verify token and get user details
          const response = await axios.get('http://localhost:3000/api/userdetails', {
            headers: { Authorization: `Bearer ${token}` }
          });

          const userData = response.data.user; // Adjust based on actual API response structure
          setUserId(userData._id);
           console.log(userData._id)
        } catch (error) {
          console.log('Error fetching user details:', error);
        }
      }
    };

    userDetails();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return; // Don't fetch if userId is not available
      console.log('Fetching Profile for User ID:', userId);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/user/profile/read/${userId}`, {
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
          // profilePic: data.profilePic || ''
        });
      } catch (error) {
        console.log('Error in fetching user profile:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {

  //     // const maxSize = 5* 1024*1024;
  //     // if(file.size > maxSize){
  //       setMessage('image should not greater than 5mb size')
  //       return;
  //     }
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProfile({
  //         ...profile,
  //         profilePic: reader.result
  //       });
  //       setIsPicSet(true);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const getInitials = () => {
    const { firstName, lastName } = profile;
    const firstInitial = firstName ? firstName.charAt(0) : '';
    const lastInitial = lastName ? lastName.charAt(0) : '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3000/api/user/profile/write/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });

      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Saving profile changes:', data);
      
      if (userId) {
        setMessage('Profile updated successfully!');
      } else {
        setMessage('Profile saved successfully!');
      }

      // Hide the message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.log('Error in saving profile:', error);
      setMessage('Error in saving profile');

      // Hide the message after 3 seconds
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
            {/* <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="profile-pic-input"
            /> */}
            <div className="profile-pic-overlay">
              Select Image
            </div>
          </div>
        </div>
        <div className="profile-name">{`${profile.firstName} ${profile.lastName}`}</div>
        <ul className="profile-menu">
          <li><Link to="/Profile">Profile</Link></li>
          <li><Link to="/account-setting">Account Security</Link></li>
          <li><Link to="/Notifications">Notifications</Link></li>
          <li><Link to="/UserCourses">My courses</Link></li>
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
              {/* Add more language options as needed */}
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
