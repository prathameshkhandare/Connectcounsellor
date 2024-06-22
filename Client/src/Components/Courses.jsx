import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Stylesheets/Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const closeDetails = () => {
    setSelectedCourse(null);
  };

  return (
    <>
      <hr />
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
              <a href="#" className="btn btn-primary" onClick={(e) => {
                e.preventDefault();
                handleCourseClick(course);
              }}>Details</a>
            </div>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <div className="details-popup">
          <div className="popup-content">
            <span className="close-button" onClick={closeDetails} style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer', zIndex: 1 }}>&times;</span>
            <div className="popup-header">
              <h5 className="popup-title">{selectedCourse.name}</h5>
            </div>
            <p className="popup-description">{selectedCourse.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;