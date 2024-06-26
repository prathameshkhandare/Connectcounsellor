import React, { useState } from 'react';
import "../Components/StyleSheets/UserProfile.css";


function UserProfile() {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    hobby: '',
    language: 'English (US)',
    website: '',
    profilePic: '' // New state variable for profile picture URL
  });

  const [isPicSet, setIsPicSet] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({
          ...profile,
          profilePic: reader.result
        });
        setIsPicSet(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = () => {
    const { firstName, lastName } = profile;
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Add your save logic here, such as sending data to backend or updating state
    console.log('Saving profile changes:', profile);
    alert('Profile saved successfully!');
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
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="profile-pic-input"
            />
            <div className="profile-pic-overlay">
              Select Image
            </div>
          </div>
        </div>
        <div className="profile-name">{`${profile.firstName} ${profile.lastName}`}</div> 
        <ul className="profile-menu">
          <li>Profile</li>
          <li>Account Security</li>
          <li>Privacy</li>
          <li>Notifications</li>
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
          <button type="submit" onClick={handleSave}>Save</button>
        </form>
      </main>
    </div>
  );
}

export default UserProfile;
