import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Stylesheets/Blog.css';
const apiurl = import.meta.env.VITE_API_URL;
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  

  useEffect(() => {
    const fetchBlogs = async () => {
      try {

        const response = await axios.get(`${apiurl}/api/blog/read`);
        setBlogs(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-list">
      {blogs.map(blog => (
        <div className="blog-card" key={blog._id}>
          <img src={blog.image} alt={blog.title} className="blog-image" />
          <div className="blog-content">
            <div>
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
            </div>
            <div className="blog-meta">
              <small>By {blog.author}</small>
              <small className='blog-date'>{new Date(blog.date).toLocaleDateString()}</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
