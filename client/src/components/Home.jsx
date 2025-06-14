// src/components/Home.js

import React from 'react';
import './Home.css'; // Create this file for styling

const Home = () => {
  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h1 className="sidebar-title">Trackr</h1>
        <ul className="sidebar-links">
          <li>Home</li>
          <li>Applications</li>
          <li>Resume/CV</li>
          <li>Prepare for Interview</li>
        </ul>
        <div className="about-link">
          About/Preferences
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Section 2 - Top stats */}
        <div className="section section-2">
          <p>
            Number of Applications: N/A &nbsp;&nbsp; 
            Number of Incoming Interviews: N/A &nbsp;&nbsp; 
            Number of Accepted: N/A
          </p>
        </div>

        {/* Section 1 - Welcome and Recent Applications */}
        <div className="section section-1">
          <h2>Welcome back ...</h2>
          <div className="recent-applications">
            <h3>Recent Applications</h3>
            <ul>
              <li>Application 1</li>
              <li>Application 2</li>
              <li>Application 3</li>
              <li>Application 4</li>
              <li>Application 5</li>
            </ul>
          </div>
        </div>

        {/* Section 3 - About/Preferences */}
        <div className="section section-3">
          <h3>About/Preferences</h3>
          <p><strong>Looking For:</strong> ...</p>
          <p><strong>Other Possible Interests:</strong> ...</p>
          <p><strong>Previous Job Titles:</strong> ...</p>
        </div>

        {/* Section 4 - Apply to jobs */}
        <div className="section section-4">
          <h3>Apply To Jobs:</h3>
          <div className="apply-icons">
            <a href="#"><img src="linkedin-icon.png" alt="LinkedIn" /></a>
            {/* Add more icons if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
