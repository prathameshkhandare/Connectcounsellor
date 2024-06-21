import React, { useState } from 'react';
<<<<<<< HEAD

=======
import './Stylesheets/Courses.css'; // Import your external CSS file

>>>>>>> a69f6ae91edf55100f6bc0c5be7e1d4a7c49ad95
const Courses = () => {
  const [categories] = useState(['Math', 'Science', 'History']);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [courses] = useState([
    {
      id: 1,
      title: 'Algebra 101',
      description: 'Introduction to Algebra',
      details: 'This course covers basic algebraic concepts.',
      isOpen: false
    },
    {
      id: 2,
      title: 'Geometry Basics',
      description: 'Foundational Geometry',
      details: 'This course introduces basic principles of geometry.',
      isOpen: false
    },
    {
      id: 3,
      title: 'Biology Essentials',
      description: 'Fundamentals of Biology',
      details: 'Fundamental concepts and theories in biology.',
      isOpen: false
    },
    {
      id: 4,
      title: 'Chemistry Fundamentals',
      description: 'Basic Chemistry Concepts',
      details: 'Essential concepts and principles in chemistry.',
      isOpen: false
    },
    {
      id: 5,
      title: 'World History Overview',
      description: 'Overview of World History',
      details: 'An overview of major events in world history.',
      isOpen: false
    },
    {
      id: 6,
      title: 'US History',
      description: 'History of the United States',
      details: 'Key events and developments in the history of the United States.',
      isOpen: false
    },

    {
        id: 7,
        title: 'US History',
        description: 'History of the United States',
        details: 'Key events and developments in the history of the United States.',
        isOpen: false
      }
,

{
    id: 8,
    title: 'US History',
    description: 'History of the United States',
    details: 'Key events and developments in the history of the United States.',
    isOpen: false
  },
{
    id: 8,
    title: 'US History',
    description: 'History of the United States',
    details: 'Key events and developments in the history of the United States.',
    isOpen: false
  }
  ]);

  // Function to handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Function to toggle course details
  const toggleCourseDetails = (id) => {
    // Implement toggle functionality if needed
  };

  return (
    <>
      <hr />
      <h4 className='heading-4'> Courses </h4>

      <div className="card-container">
        {courses.map((course) => (
          <div key={course.id} className="card" style={{ width: '18rem', marginBottom: '20px' }}>
            {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
            <div className="card-body">
              <h5 className="card-title">{course.title}</h5>
              <p className="card-text">{course.description}</p>
              <a href="#" className="btn btn-primary">Details</a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Courses;
