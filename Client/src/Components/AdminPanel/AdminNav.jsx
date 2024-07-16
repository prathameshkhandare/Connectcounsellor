import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import './AdminPanel.css';
import { useAuth } from '../../store/AuthContex';
const AdminNav = () => {
  const { removeTokenLS} =useAuth();
  const navigate = useNavigate(); // Use navigate hook to navigate between routes
  const handleLogout = () => {
    removeTokenLS();
    navigate('/login')// Navigate to login page on logout
  };
  return (
    <div className="admin-panel-navbar">
      <Link to="/admin-home">Home</Link>
      <Link to="/admin/courses">Manage Courses</Link>
      <Link to="/admin/blogs">Manage Blogs</Link>
      <Link to="/admin/Appointment">Check Appointments</Link>
      <button onClick={handleLogout}  
      
      style={{
        backgroundColor: 'red', // Background color
        color: 'white', // Text color
        border: 'none', // No border
        padding: '10px 20px', // Padding
        borderRadius: '5px', // Rounded corners
        cursor: 'pointer', // Pointer cursor on hover
        fontSize: '16px', // Font size
      }}
      > logout</button>
      
      
    </div>
  );
};

export default AdminNav;
