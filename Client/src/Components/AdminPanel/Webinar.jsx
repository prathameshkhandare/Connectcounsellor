import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './AdminPanel.css';

Modal.setAppElement('#root');

const WebinarManagement = () => {
  const [webinars, setWebinars] = useState([]);
  const [newWebinar, setNewWebinar] = useState({
    title: '',
    presenter: '',
    description: '',
    date: '',
    time: '',
    duration: '',
  });
  const [editWebinar, setEditWebinar] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const token = localStorage.getItem('token'); // Get token from local storage

  useEffect(() => {
    fetchWebinars();
  }, []);

  const fetchWebinars = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.get(`${API_URL}/api/webinars/read`);
      setWebinars(response.data);
    } catch (error) {
      console.error('Error fetching webinars:', error);
    }
  };

  const addWebinar = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.post(
        `${API_URL}/api/webinars/write`,
        newWebinar,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWebinars([...webinars, response.data]);
      setNewWebinar({
        title: '',
        presenter: '',
        description: '',
        date: '',
        time: '',
        duration: '',
      });
    } catch (error) {
      console.error('Error adding webinar:', error);
    }
  };

  const deleteWebinar = async (webinarId) => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      await axios.delete(`${API_URL}/api/webinars/delete/${webinarId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedWebinars = webinars.filter((webinar) => webinar._id !== webinarId);
      setWebinars(updatedWebinars);
    } catch (error) {
      console.error('Error deleting webinar:', error);
    }
  };

  const openEditModal = (webinar) => {
    setEditWebinar(webinar);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditWebinar(null);
  };

  const updateWebinar = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.put(
        `${API_URL}/api/webinars/update/${editWebinar._id}`,
        editWebinar,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedWebinars = webinars.map((webinar) =>
        webinar._id === editWebinar._id ? response.data : webinar
      );
      setWebinars(updatedWebinars);
      closeEditModal();
    } catch (error) {
      console.error('Error updating webinar:', error);
    }
  };

  return (
    <>
      <h2 className='manage-webinar-heading'>Manage Webinars</h2>
      <div className="admin-panel-webinar-management">
        <div className="admin-panel-new-webinar">
          <h3>Add New Webinar</h3>
          <input
            type="text"
            placeholder="Webinar Title"
            value={newWebinar.title}
            onChange={(e) => setNewWebinar({ ...newWebinar, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Presenter"
            value={newWebinar.presenter}
            onChange={(e) => setNewWebinar({ ...newWebinar, presenter: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newWebinar.description}
            onChange={(e) => setNewWebinar({ ...newWebinar, description: e.target.value })}
          />
          <input
            type="date"
            placeholder="Date"
            value={newWebinar.date}
            onChange={(e) => setNewWebinar({ ...newWebinar, date: e.target.value })}
          />
          <input
            type="time"
            placeholder="Time"
            value={newWebinar.time}
            onChange={(e) => setNewWebinar({ ...newWebinar, time: e.target.value })}
          />
          <input
            type="text"
            placeholder="Duration"
            value={newWebinar.duration}
            onChange={(e) => setNewWebinar({ ...newWebinar, duration: e.target.value })}
          />
          <button className="admin-panel-button" onClick={addWebinar}>Add Webinar</button>
        </div>

        <div className="admin-panel-webinar-list">
          <h3>Webinar List</h3>
          <ul>
            {webinars.map((webinar) => (
              <li key={webinar._id}>
                <span>{webinar.title}</span>
                <div className="admin-panel-button-container">
                  <button className="admin-panel-edit-button" onClick={() => openEditModal(webinar)}>Edit</button>
                  <button className="admin-panel-delete-button" onClick={() => deleteWebinar(webinar._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {editWebinar && (
          <Modal
            isOpen={isEditModalOpen}
            onRequestClose={closeEditModal}
            contentLabel='Edit Webinar'
          >
            <div className="edit-webinar-container">
              <h3>Edit Webinar Details</h3>
              <input
                type="text"
                placeholder="Webinar Title"
                value={editWebinar.title}
                onChange={(e) => setEditWebinar({ ...editWebinar, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Presenter"
                value={editWebinar.presenter}
                onChange={(e) => setEditWebinar({ ...editWebinar, presenter: e.target.value })}
              />
              <input
                type="text"
                placeholder="Description"
                value={editWebinar.description}
                onChange={(e) => setEditWebinar({ ...editWebinar, description: e.target.value })}
              />
              <input
                type="date"
                placeholder="Date"
                value={editWebinar.date}
                onChange={(e) => setEditWebinar({ ...editWebinar, date: e.target.value })}
              />
              <input
                type="time"
                placeholder="Time"
                value={editWebinar.time}
                onChange={(e) => setEditWebinar({ ...editWebinar, time: e.target.value })}
              />
              <input
                type="text"
                placeholder="Duration"
                value={editWebinar.duration}
                onChange={(e) => setEditWebinar({ ...editWebinar, duration: e.target.value })}
              />

              <div className="button-group">
                <button className="admin-panel-button" onClick={updateWebinar}>Update Webinar</button>
                <button className="admin-panel-button" onClick={closeEditModal}>Cancel</button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default WebinarManagement;
