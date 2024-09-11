import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Stylesheets/Courses.css';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Define the base API URL
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        
       
        const response = await axios.get(`${API_URL}/api/courses/read`);
        setCourses(response.data);

        // Extract unique categories from courses
        const uniqueCategories = [...new Set(response.data.map(course => course.category))];
        setCategories(['All', ...uniqueCategories]);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, [API_URL]);

  const filteredCourses = selectedCategory === 'All'
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  return (
    <>
      <h4 className='heading-4'> Courses </h4>

      <div className="categories-container">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="card-container">
        {filteredCourses.map((course, index) => (
          <div key={course._id} className={`card ${index % 3 === 0 ? 'card-first' : ''}`}>
            <div className="card-img-wrapper">
              <img src={course.image} alt={course.name} className="card-img" />
            </div>
            <div className="card-body">
              <h5 className="card-title">{course.name}</h5>
              {/* <p className="card-text">{course.shortdescription}</p> */}
            </div>
            <div className="card-footer">
              <Link to={`/courseInfo/${course._id}`} className="Details-btn-primary">Details</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Courses;
