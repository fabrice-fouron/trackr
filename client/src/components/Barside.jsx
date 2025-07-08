// src/components/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Barside.css'; // Or create a Sidebar.css if you'd prefer to separate it

const Barside = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h1 className="sidebar-title">Trackr</h1>
      <ul className="sidebar-links">
        <li onClick={() => navigate('/')}>Home</li>
        <li onClick={() => navigate('/applications')}>Applications</li>
        <li onClick={() => navigate('/resume')}>Resume/CV</li>
        <li onClick={() => navigate('/interview')}>Prepare for Interview</li>
      </ul>
      <div className="about-link" onClick={() => navigate('/preferences')}>
        About/Preferences
      </div>
    </div>
  );
};

export default Barside;
