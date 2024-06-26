import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPanel.css';

const AdminNav = () => {
  return (
    <div className="admin-panel-navbar">
      <Link to="/admin/courses">Manage Courses</Link>
      <Link to="/admin/blogs">Manage Blogs</Link>
      {/* Add more links as needed */}
    </div>
  );
};

export default AdminNav;
