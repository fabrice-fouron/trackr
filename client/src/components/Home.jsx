// src/components/Home.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Barside from './Barside';

const Home = ({numOfApplications, numOfInterviews, }) => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Barside />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
