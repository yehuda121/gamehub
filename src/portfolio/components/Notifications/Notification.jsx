// Notification.jsx
import React from "react";
import "./Notification.css";

const Notification = ({ type = "info", message }) => {
  if (!message) return null;

  return (
    <div className={`notif notif-${type}`}>
      {message}
    </div>
  );
};

export default Notification;
