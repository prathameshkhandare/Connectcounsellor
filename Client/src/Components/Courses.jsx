import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Stylesheets/Courses.css';
import { useNavigate } from 'react-router-dom';
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
const navigate = useNavigate();
  // Define the base API URL
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/courses/read`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };
    fetchCourses();
  }, [API_URL]);
  if(loading){
    return <Loading/>
  }

  const filteredCourses =
    selectedCategory === 'All'
      ? courses
      : courses.filter(course => course.category === selectedCategory);

  return (
    <>
      <div className="course-outer-container">
        <h1>Courses</h1>
        <p>
        Unlock the tools to heal, grow, and thrive in every aspect of your personal and emotional life.
        </p>

        {/* Categories */}
        <div className="course-category-container">
          <button
            id="course-category-btn"
            className={selectedCategory === 'All' ? 'selected' : ''}
            onClick={() => setSelectedCategory('All')}
          >
            All
          </button>
          <button
            id="course-category-btn"
            className={selectedCategory === 'Couple' ? 'selected' : ''}
            onClick={() => setSelectedCategory('Couple')}
          >
            Couple
          </button>
          <button
            id="course-category-btn"
            className={selectedCategory === 'Parenting' ? 'selected' : ''}
            onClick={() => setSelectedCategory('Parenting')}
          >
            Parenting
          </button>
          <button
            id="course-category-btn"
            className={selectedCategory === 'Anxiety and Depression'? 'selected' : ''}
            onClick={() => setSelectedCategory('Anxiety and Depression')}
          >
            Anxiety and Depression
          </button>
          <button
            id="course-category-btn"
            className={selectedCategory === 'Sexual'? 'selected' : ''}
            onClick={() => setSelectedCategory('Sexual')}
          >
            Sexual
          </button>
          <button
            id="course-category-btn"
            className={selectedCategory === 'Career'? 'selected' : ''}
            onClick={() => setSelectedCategory('Career')}
          >
            Career
          </button>
        </div>

        {/* Display Courses */}
        <div className="course-inner-container">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card-container">
              <div className="course-card-img-container">
                <img src={course.image} alt={course.title} />
              </div>
              <div className="course-card-detail-container">
                <div>
                  <p id="topic-webinar">{course.name}</p>
                  <p id="topic-webinar-discription">{course.shortdescription}</p>
                </div>

                <div className="flex-webinar">
                  <p id="topic-webinar-discription">
                  <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </p>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/courseInfo/${course._id}`); // Navigate to courseinfo/:id
                    }}
                  >
                    <i
                      id="webinar-view-btn"
                      className="fa-solid fa-circle-arrow-right"
                    ></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Courses;
