import React, { useEffect, useState } from 'react';
import '../Components/StyleSheets/UserCourses.css';
import { Link } from 'react-router-dom';

const UserCourses = () => {
  const [courses, setCourses] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [activeTab, setActiveTab] = useState('courses');
  const API_URL = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/api/enrolled/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (Array.isArray(data)) setCourses(data);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };
    fetchEnrolledCourses();
  }, [API_URL, token]);

  useEffect(() => {
    const fetchEnrolledWebinars = async () => {
      try {
        const response = await fetch(`${API_URL}/api/enrolled/webinars`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (Array.isArray(data.webinars)) setWebinars(data.webinars);
      } catch (error) {
        console.error('Error fetching enrolled webinars:', error);
      }
    };
    fetchEnrolledWebinars();
  }, [API_URL, token]);

  return (
    <div className="course-outer-container">
      <h1>Your Dashboard</h1>

      <div className="course-category-container">
        <button
          id="course-category-btn"
          className={activeTab === 'courses' ? 'selected' : ''}
          onClick={() => setActiveTab('courses')}
        >
          Courses
        </button>
        <button
          id="course-category-btn"
          className={activeTab === 'webinars' ? 'selected' : ''}
          onClick={() => setActiveTab('webinars')}
        >
          Webinars
        </button>
      </div>

      <div className="course-inner-container">
        {activeTab === 'courses' ? (
          courses.length > 0 ? (
            courses.map((course, index) => (
              <div key={index} className="course-card-container">
                <div className="course-card-img-container">
  {course.courseId && course.courseId.image ? (
    <img
      key={course._id}
      src={course.courseId.image}
      alt={course.courseName || 'Course Image'}
    />
  ) : (
    <div key={course._id} className="fallback-course-name">
      {course.courseName}
    </div>
  )}
</div>

                <div className="course-card-detail-container">
                  <p id="topic-webinar"><strong>{course.courseName}</strong></p>
                  <p id="topic-webinar-discription">
                    Enrollment Date: {new Date(course.enrollmentDate).toLocaleDateString()}
                  </p>
                  <div className="flex-webinar">
                    <Link to={`/courseInfo/${course.courseId}`}>Go to course</Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No courses enrolled yet.</p>
          )
        ) : (
          webinars.length > 0 ? (
            webinars.map((webinar, index) => (
              <div key={index} className="course-card-container">
                <div className="course-card-img-container">
                  
                  <img 
                     src={
                      webinar.platform === "zoom"
                        ? "https://lh6.googleusercontent.com/3qQY88BkqF6IF9cBs_AGmlCh04ZaNsctNAIjuNL38qC8etWll6mSxzoDz0Ka8XVDyY-yCTcxlkNSpWHN09PbUNqh4-dB26kdswGPrpKVOIdjhYWv5UpR-TAfazI4QNJu8-nzO7o1wFA9SbtweUs7DVk"
                        : "https://logos-world.net/wp-content/uploads/2022/05/Google-Meet-Symbol.png"
                    }
                    alt="webinar"
                  />

                  
                </div>
                <div className="course-card-detail-container">
                  <p id="topic-webinar"><strong>{webinar.title}</strong></p>
                  <p id="topic-webinar-discription">
                    Presenter: {webinar.presenter} | Date: {new Date(webinar.date).toLocaleDateString()}
                  </p>
                  <div className="flex-webinar">
                    <Link to={`/webinarInfo/${webinar._id}`}>Go to webinar</Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No webinars enrolled yet.</p>
          )
        )}
      </div>
    </div>
  );
};

export default UserCourses;
