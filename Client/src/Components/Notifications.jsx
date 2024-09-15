import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Components/StyleSheets/Notifications.css";

function Notifications() {
  // Dummy notifications data
  const notifications = [
    {id:1,message : 'No new notification'}
  ];

  return (
    <div className="notifications-page">
      <h1 className="notifications-heading">Notifications</h1>
      <div className="notifications-container">
        {notifications.map(notification => (
          <div key={notification.id} className="notification-item">
            <p className="notification-message">{notification.message}</p>
            <p className="notification-time">{notification.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
