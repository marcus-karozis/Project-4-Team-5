import React from 'react';
import './LogoutButton.css';

const LogoutButton = ({ onLogout }) => {
  return (
    <button className="logout-button" onClick={onLogout}>
      Logout
    </button> 
  );
};

export default LogoutButton;
