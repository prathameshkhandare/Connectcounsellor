import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Stylesheets/Blog.css'
const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/blog/read');
        setBlogs(response.data);
        console.log(response.data);

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
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <p><small>By {blog.author}</small></p>
          <p><small>{new Date(blog.date).toLocaleDateString()}</small></p>
        </div>
      ))}
    </div>
  );
};

export default Blog;