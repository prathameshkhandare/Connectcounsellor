import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminPanel.css';
import { useAuth } from '../../store/AuthContex';
import logo from '../../assets/Img/mind_logo.png'; 

const AdminNav = () => {
  const { removeTokenLS } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    removeTokenLS();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="admin-panel-navbar">
      <img src={logo} alt="Logo" className="logo" /> {/* Logo added */}
      <div className="menu-icon" onClick={toggleMenu}>
        {isMenuOpen ? '✖' : '☰'}
      </div>
      <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
        <Link to="/admin-home" onClick={toggleMenu}>Home</Link>
        <Link to="/admin/courses" onClick={toggleMenu}>Manage Courses</Link>
        <Link to="/admin/blogs" onClick={toggleMenu}>Manage Blogs</Link>
        <Link to="/admin/Appointment" onClick={toggleMenu}>Check Appointments</Link>
        <Link to = "/admin/webinar" onClick={toggleMenu}>Manage Webinar </Link>
      </div>
      <button onClick={() => { handleLogout(); toggleMenu(); }} className='admin-logout-btn'>
        Logout
      </button> {/* Moved to the right end */}
    </div>
  );
};

export default AdminNav;
