import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Stylesheets/courseinfo.css';
import { useParams } from 'react-router-dom';

const CourseInfo = () => {
  const [course, setCourse] = useState(null);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log('Fetching course with courseId:', courseId);
        const response = await axios.get(`http://localhost:3000/api/courses/read/${courseId}`);
        console.log('Response:', response.data);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-info-container">
      <div className="course-details">
        <div className="course-header">
          <h1 className="course-title">{course.name}</h1>
          <p className="course-subtitle">{course.shortdescription}</p>
        </div>
        <div className="course-image">
          <img src={course.image} alt={course.name} />
        </div>
        <div className="course-content">
          <h1 className="course-title">What You Will Learn</h1>
          <ul className="course-learn-list">
            {course.content && course.content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="course-content">
            <h1 className='course-title'> Course Description</h1>
          <p className="course-description">{course.description}</p>
        </div>
      </div>
      <div className="course-sidebar">
        <div className="course-instructor">
          <h3>Instructor</h3>
          <p>{course.instructor}</p>
        </div>
        <div className="course-ratings">
          <h3>Rating</h3>
          <p>4.7 (209,135 ratings)</p>
        </div>
        <div className="course-students">
          <h3>Students</h3>
          <p>975,558</p>
        </div>
        <div className="course-action">
          <button className="btn btn-primary">Enroll Now</button>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
