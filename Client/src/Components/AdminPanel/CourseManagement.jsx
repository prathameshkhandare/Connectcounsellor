import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: '', image: '', shortdescription: '', description: '', content: '', category: '' });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/courses/read');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const addCourse = async () => {
    try {
      const contentArray = newCourse.content.split(',').map(item => item.trim());
      const response = await axios.post('http://localhost:3000/api/courses/write', { ...newCourse, content: contentArray });
      setCourses([...courses, response.data]);
      setNewCourse({ name: '', image: '', shortdescription: '', description: '', content: '', category: '' });
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div className="admin-panel-course-management">
      <h2>Manage Courses</h2>
      <div className="admin-panel-new-course">
        <input
          type="text"
          placeholder="Course Name"
          value={newCourse.name}
          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newCourse.image}
          onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })}
        />
        <input
          type="text"
          placeholder="Short Description"
          value={newCourse.shortdescription}
          onChange={(e) => setNewCourse({ ...newCourse, shortdescription: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
        />
        <textarea
          placeholder="Content (comma separated)"
          value={newCourse.content}
          onChange={(e) => setNewCourse({ ...newCourse, content: e.target.value })}
          rows={5}
        />
        <input
          type="text"
          placeholder="Category"
          value={newCourse.category}
          onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
        />
        <button className="admin-panel-button" onClick={addCourse}>Add Course</button>
      </div>
      <div className="admin-panel-course-list">
        <h3>Course List</h3>
        <ul>
          {courses.map((course) => (
            <li key={course._id}>{course.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseManagement;
