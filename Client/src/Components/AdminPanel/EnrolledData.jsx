import React, { useState, useEffect } from 'react';
import '../Stylesheets/EnrolledData.css'; // Import the custom CSS

const EnrolledData = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState([]);
  const [filter, setFilter] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch the enrollment data when the component mounts
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await fetch(`${API_URL}/api/getallenrolledusers`); // Adjust API endpoint
        const data = await response.json();
        setEnrollments(data);
        setFilteredEnrollments(data); // Initially display all enrollments
      } catch (error) {
        console.error('Error fetching enrollment data:', error);
      }
    };

    fetchEnrollments();
  }, []);

  // Handle filter change
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    
    if (value) {
      const filteredData = enrollments.filter(enrollment =>
        enrollment.courseName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEnrollments(filteredData);
    } else {
      setFilteredEnrollments(enrollments); // Reset to all enrollments if filter is empty
    }
  };

  return (
    <div className="enrolledDataOuter">
      <h5>filter the courses</h5>
      <div className="filterContainer">
        <input
          type="text"
          placeholder="Filter by course name"
          value={filter}
          onChange={handleFilterChange}
          className="filterInput"
        />
      </div>
      {filteredEnrollments.length > 0 ? (
        <div className="enrolledDataGrid">
          {filteredEnrollments.map((enrollment, index) => (
            <div key={index} className="enrolledDataCard">
              <h3>{enrollment.courseName}</h3>
              <p><strong>Course:</strong> {enrollment.courseId} - {enrollment.courseName}</p>
              <p><strong>User:</strong> {enrollment.userId?.firstName || 'N/A'}</p>
              <p><strong>Email:</strong> {enrollment.userId?.email || 'N/A'}</p>
              <p><strong>Date:</strong> {enrollment.enrollmentDate.split("T")[0]}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="enrolledDataNoData">No enrollments found.</p>
      )}
    </div>
  );
};

export default EnrolledData;
