import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './AdminPanel.css';

Modal.setAppElement('#root');

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    name: '',
    image: '',
    shortdescription: '',
    description: '',
    content: '',
    category: '',
    price: '',
  });
  const [editCourse, setEditCourse] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const token = localStorage.getItem('token'); // Get token from local storage

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.get(`${API_URL}/api/courses/read`);
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const addCourse = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const contentArray = newCourse.content.split(',').map((item) => item.trim());
      const response = await axios.post(
        `${API_URL}/api/courses/write`,
        { ...newCourse, content: contentArray },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourses([...courses, response.data]);
      setNewCourse({
        name: '',
        image: '',
        shortdescription: '',
        description: '',
        content: '',
        category: '',
        price : '',
      });
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const deleteCourse = async (courseId) => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      await axios.delete(`${API_URL}/api/courses/delete/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedCourses = courses.filter((course) => course._id !== courseId);
      setCourses(updatedCourses);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const openEditModal = (course) => {
    setEditCourse(course);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditCourse(null);
  };

  const updateCourse = async () => {

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const contentArray = editCourse.content.split(',').map((item) => item.trim());
      const response = await axios.put(
        `${API_URL}/api/courses/update/${editCourse._id}`,
        { ...editCourse, content: contentArray },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedCourses = courses.map((course) =>
        course._id === editCourse._id ? response.data : course
      );
      setCourses(updatedCourses);
      closeEditModal();
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleCategorySelect = (category) => {
    setNewCourse({ ...newCourse, category });
    setIsCategoryDropdownOpen(false);
  };
  const handleDropdownToggle = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
    // console.log("Dropdown state:", !isCategoryDropdownOpen); // Add this line
  };
  

  return (
    <>
      <h2 className='manage-course-heading'>Manage Courses</h2>
      <div className="admin-panel-course-management">
        <div className="admin-panel-new-course">
          <h3>Add New Course</h3>
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
<div className={`category-dropdown ${isCategoryDropdownOpen ? 'open' : ''}`}>
  <input
    type="text"
    className="category-input"  // Add this class
    placeholder="Category"
    value={newCourse.category}
    onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
    onClick={handleDropdownToggle} // Updated
  />
  <div className="dropdown-arrow" onClick={handleDropdownToggle}>
    ▼  
  </div>
  {isCategoryDropdownOpen && (
    <ul className="dropdown-menu">
      <li onClick={() => handleCategorySelect('Couple')}>Couple</li>
      <li onClick={() => handleCategorySelect('Parenting')}>Parenting</li>
      <li onClick={() => handleCategorySelect('Depression')}>Depression</li>
      <li onClick={() => handleCategorySelect('Sexual')}>Sexual</li>
      <li onClick={() => handleCategorySelect('Career')}>Career</li>
    </ul>
  )}
</div>



          <input
            type="text"
            placeholder="Price"
            value={newCourse.price}
            onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
          />
          <button className="admin-panel-button" onClick={addCourse}>Add Course</button>
        </div>
        <div className="admin-panel-course-list">
          <h3>Course List</h3>
          <ul>
            {courses.map((course) => (
              <li key={course._id}>
                <span>{course.name}</span>
                <div className="admin-panel-button-container">
                  <button className="admin-panel-edit-button" onClick={() => openEditModal(course)}>Edit</button>
                  <button className="admin-panel-delete-button" onClick={() => deleteCourse(course._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {editCourse && (
          <Modal
            isOpen={isEditModalOpen}
            onRequestClose={closeEditModal}
            contentLabel='Edit Course'
          >
            <div className="edit-course-container">
              <h3>Edit Course Details</h3>
              <div className="form-group">
                <label>Course Name:</label>
                <input
                  type="text"
                  placeholder="Course Name"
                  value={editCourse.name}
                  onChange={(e) => setEditCourse({ ...editCourse, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Image URL:</label>
                <input
                  type="text"
                  placeholder="Image URL"
                  value={editCourse.image}
                  onChange={(e) => setEditCourse({ ...editCourse, image: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Short Description:</label>
                <input
                  type="text"
                  placeholder="Short Description"
                  value={editCourse.shortdescription}
                  onChange={(e) => setEditCourse({ ...editCourse, shortdescription: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <input
                  type="text"
                  placeholder="Description"
                  value={editCourse.description}
                  onChange={(e) => setEditCourse({ ...editCourse, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Content (comma separated):</label>
                <textarea
                  placeholder="Content (comma separated)"
                  value={editCourse.content}
                  onChange={(e) => setEditCourse({ ...editCourse, content: e.target.value })}
                  rows={5}
                ></textarea>
              </div>

              <div className="form-group">
                <label>Category:</label>
                <input
                  type="text"
                  placeholder="Category"
                  value={editCourse.category}
                  onChange={(e) => setEditCourse({ ...editCourse, category: e.target.value })}
                />

                <div className="form-group">
                  <label>Price: </label>
                  <input type="text"
                  placeholder='price'
                  value={editCourse.price}
                  onChange={(e)=> setEditCourse({...editCourse,price:e.target.value})}
                   />
                </div>
              </div>

              <div className="button-group">
                <button className="admin-panel-button" onClick={updateCourse}>Update Course</button>
                <button className="admin-panel-button" onClick={closeEditModal}>Cancel</button>
              </div>
            </div>
          </Modal>
        )}
      </div>

    </>
  );
};

export default CourseManagement;
