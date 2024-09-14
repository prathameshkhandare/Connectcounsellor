import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';

import './Stylesheets/Blog.css';
const apiurl = import.meta.env.VITE_API_URL;
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading,setLoading] = useState(true);
  

  useEffect(() => {
    const fetchBlogs = async () => {
      try {

        const response = await axios.get(`${apiurl}/api/blog/read`);
        setBlogs(response.data.reverse());
        setLoading(false);
        
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  if(loading){
    return<Loading/>;
  }

  return (
    <div className="blog-list">
      {blogs?.reverse().map(blog => (
        <div className="blog-card" key={blog._id}>
          <img src={blog.image} alt={blog.title} className="blog-image" />
          <div className="blog-content">
            <div>
<<<<<<< HEAD
              <p id='blog-category'>{blog.category}</p>
              <p id='blog-title'>{blog.title}</p>
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
