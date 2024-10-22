import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/notification', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      {notifications.map((notification) => (
        <div key={notification._id}>
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Notification;
