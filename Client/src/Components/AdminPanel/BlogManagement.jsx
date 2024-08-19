import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', author: '', image: '' });
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const API_URL = import.meta.env.VITE_API_URL; // Define the base API URL
    try {
      const response = await axios.get(`${API_URL}/api/blog/read`);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const addBlog = async () => {
    const token = localStorage.getItem('token');
    const API_URL = import.meta.env.VITE_API_URL; // Define the base API URL
    try {
      const response = await axios.post(`${API_URL}/api/blog/write`, newBlog, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setBlogs([...blogs, response.data]);
      setNewBlog({ title: '', content: '', author: '', image: '' });
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  const deleteBlog = async (id) => {
    const token = localStorage.getItem('token');
    const API_URL = import.meta.env.VITE_API_URL; // Define the base API URL
    try {
      const response = await axios.delete(`${API_URL}/api/blog/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setBlogs(blogs.filter(blog => blog._id !== id));
      setMessage(response.data.message);
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false); // Hide message after 3 seconds
        navigate('/admin/blogs'); // Redirect to Admin Panel
      }, 3000); // Hide after 3 seconds
    } catch (error) {
      console.error('Error deleting blog:', error);
      setMessage('Error deleting blog');
    }
  };

  return (
    <div className="admin-panel-blog-management">
      {showMessage && (
        <div className="admin-panel-message">
          {message}
        </div>
      )}
      <div className="admin-panel-blog-list">
        <h3>Blog List</h3>
        <ul>
          {blogs.map((blog) => (
            <li key={blog._id}>
              <h4>{blog.title}</h4>
              <p>{blog.content}</p>
              <p><strong>Author:</strong> {blog.author}</p>
              {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '100px' }} />}
              <button className="admin-panel-button delete" onClick={() => deleteBlog(blog._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="admin-panel-new-blog">
        <h2>Add New Blog</h2>
        <input
          type="text"
          placeholder="Blog Title"
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newBlog.content}
          onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBlog.author}
          onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newBlog.image}
          onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
        />
        <button className="admin-panel-button" onClick={addBlog}>Add Blog</button>
      </div>
    </div>
  );
};

export default BlogManagement;
