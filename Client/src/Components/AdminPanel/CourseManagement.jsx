import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './AdminPanel.css';

Modal.setAppElement('#root');

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: '', image: '', shortdescription: '', description: '', content: '', category: '' });
  const[editCourse ,setEditCourse] =  useState(null);
  const [isEditModalOpen ,setIsEditModalOpen] = useState(false);

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
      const response = await axios.post('http://localhost:3000/api/courses/write', { ...newCourse, content: contentArray },{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCourses([...courses, response.data]);
      setNewCourse({ name: '', image: '', shortdescription: '', description: '', content: '', category: '' });
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:3000/api/courses/delete/${courseId} {
          headers: {
            'Authorization': Bearer ${token}
          }
        }`);
      const updatedCourses = courses.filter(course => course._id !== courseId);
      setCourses(updatedCourses);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const openEditModal =(course)=>{
    setEditCourse(course);
    setIsEditModalOpen(true);
};

const closeEditModal =()=>{
  setIsEditModalOpen(false);
  setEditCourse(null);
}

const updateCourse = async () => {
  try {
    const response = await axios.put(`http://localhost:3000/api/courses/update/${editCourse._id}`, { ...editCourse });
    const updatedCourses = courses.map(course => (course._id === editCourse._id ? response.data : course));
    setCourses(updatedCourses);
    closeEditModal();
  } catch (error) {
    console.error('Error updating course:', error);
  }
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
            <li key={course._id}>
              <span>{course.name}</span>
        <div className="admin-panel-button-container">
          <button className="admin-panel-button admin-panel-edit-button" onClick={() => openEditModal(course)}>Edit</button>
          <button className="admin-panel-button admin-panel-delete-button" onClick={() => deleteCourse(course._id)}>Delete</button>
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
            // ariaHideApp={false}
            >

            <h3> Edit Course Details</h3>
            <input type="text"
            placeholder='course name'
            value={editCourse.name}
            onChange={(e)=> setEditCourse({...editCourse,name:e.target.value})}
            
            />

            <input type="text"
            placeholder='image url'
            value={editCourse.image}
            onChange={(e)=> setEditCourse({...editCourse,image : e.target.value})}
            />

            <input type="text" 
            placeholder='short description'
            value={editCourse.shortdescription}
            onChange={(e)=> setEditCourse({...editCourse,shortdescription:e.target.value})}
            />

            <input type="text"
            placeholder='description'
            value={editCourse.description}
            onChange={(e)=> setEditCourse({...editCourse,description:e.target.value})}
            />

            <textarea 
            placeholder='Content (comma seperated)'
            value={editCourse.content}
            onChange={(e)=>setEditCourse({...editCourse,content:e.target.value}) } rows={5}
            ></textarea>

            <input type="text"
            placeholder='category'
            value={editCourse.category}
            onChange={(e)=> setEditCourse({...editCourse,category : e.target.value})} />



<button className="admin-panel-button" onClick={updateCourse}>Update Course</button>
          <button className="admin-panel-button" onClick={closeEditModal}>Cancel</button>



            </Modal>
          )}








    </div>
    </>
  );
};

export default CourseManagement;