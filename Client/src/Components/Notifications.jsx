import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Components/StyleSheets/Notifications.css";

function Notifications() {
  // Dummy notifications data
  const notifications = [
    // { id: 1, message: 'You have a new message from John Doe.', time: '2 mins ago' },
    // { id: 2, message: 'Your appointment is confirmed for tomorrow.', time: '1 hour ago' },
    // { id: 3, message: 'Your password was successfully changed.', time: '3 hours ago' },
    // { id: 4, message: 'New blog post: Mental Health Awareness Tips.', time: 'Yesterday' },
    // { id: 5, message: 'Your subscription will expire soon.', time: '2 days ago' },
    {message : 'No new notification'}
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
