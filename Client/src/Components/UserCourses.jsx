import React, { useEffect, useState } from 'react';
import '../Components/StyleSheets/UserCourses.css';
import { Link } from 'react-router-dom';

const UserCourses = () => {
  const [courses, setCourses] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [activeTab, setActiveTab] = useState('courses'); // For tab control
  const API_URL = "http://localhost:3000";
  const token = localStorage.getItem('token');

  // Fetch enrolled courses when the component mounts
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/api/enrolled/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (Array.isArray(data)) {
          setCourses(data);
        }
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };

    fetchEnrolledCourses();
  }, [API_URL, token]);

  // Fetch enrolled webinars when the component mounts
  useEffect(() => {
    const fetchEnrolledWebinars = async () => {
      try {
        const response = await fetch(`${API_URL}/api/enrolled/webinars`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (Array.isArray(data.webinars)) {
          setWebinars(data.webinars);
        }
      } catch (error) {
        console.error('Error fetching enrolled webinars:', error);
      }
    };

    fetchEnrolledWebinars();
  }, [API_URL, token]);

  return (
    <div className="usercourses-container">
      <h2 className="usercourses-header">Your Dashboard</h2>

      <div className="usercourses-tab-container">
        <div
          className={`usercourses-tab ${activeTab === 'courses' ? 'selected' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          Courses
        </div>
        <div
          className={`usercourses-tab ${activeTab === 'webinars' ? 'selected' : ''}`}
          onClick={() => setActiveTab('webinars')}
        >
          Webinars
        </div>
      </div>

      {activeTab === 'courses' ? (
        <div className="usercourses-grid">
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <div key={index} className="usercourses-card">
                <p><strong>Course name:</strong> {course.courseName}</p>
                <p><strong>Enrollment Date:</strong> {new Date(course.enrollmentDate).toLocaleDateString()}</p>
                <p><Link to={`/courseInfo/${course.courseId}`}>Go to course</Link></p>
              </div>
            ))
          ) : (
            <p>No courses enrolled yet.</p>
          )}
        </div>
      ) : (
        <div className="usercourses-grid">
          {webinars.length > 0 ? (
            webinars.map((webinar, index) => (
              <div key={index} className="usercourses-card">
                <p><strong>Webinar Title:</strong> {webinar.title}</p>
                <p><strong>Presenter:</strong> {webinar.presenter}</p>
                <p><strong>Date:</strong> {new Date(webinar.date).toLocaleDateString()}</p>
                <p><Link to={`/webinarInfo/${webinar._id}`}>Go to webinar</Link></p>
              </div>
            ))
          ) : (
            <p>No webinars enrolled yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCourses;
