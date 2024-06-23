import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Stylesheets/Courses.css';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/courses/read');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      {/* <hr /> */}
      <h4 className='heading-4'> Courses </h4>

      <div className="card-container">
        {courses.map((course, index) => (
          <div key={course._id} className={`card ${index % 3 === 0 ? 'card-first' : ''}`}>
            <div className="card-img-wrapper">
              <img src={course.image} alt={course.name} className="card-img" />
            </div>
            <div className="card-body">
              <h5 className="card-title">{course.name}</h5>
              <p className="card-text">{course.shortdescription}</p>
              <Link to={`/courseInfo/${course._id}`} className="btn btn-primary">Details</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Courses;