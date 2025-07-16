// src/components/Home.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Barside from './Barside';
import { Box, Card, CardContent, Typography } from '@mui/material';

const Home = ({userData}) => {

  return (
    <div className="home-container">
      <Barside />
      {/* Main Content */}
      <div className="main-content">
        {/* Section 2 - Top stats */}
        
        <Box sx={{border: "1px solid", borderRadius: "5px", padding: "10px", borderColor: "#ccc"}}>
          <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap"}}>
            <Card>
              <CardContent sx={{color: "#f2930f", textAlign: "center"}}>
                <Typography variant='subtitle1' fontWeight="medium" gutterBottom >
                  <strong># of Applications</strong>
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {userData.numberOfApplications}
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{color: "#1148bf", textAlign: "center"}}>
                <Typography variant='subtitle1' fontWeight="medium" gutterBottom>
                  <strong># of Incoming Interviews</strong>
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {userData.numberOfInterviews}
                </Typography>
              </CardContent>
            </Card>

            <Card>
            <CardContent sx={{color: "#42bf11", textAlign: "center"}}>
              <Typography variant='subtitle1' fontWeight="medium" gutterBottom>
                <strong># of Accepted</strong>
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                  {userData.numberOfAcceptance}
                </Typography>
            </CardContent>
            </Card>

            <Card>
            <CardContent sx={{color: "#cc0808", textAlign: "center"}}>
              <Typography variant='subtitle1' fontWeight="medium" gutterBottom>
                <strong># of Rejections</strong>
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                  {userData.numberOfRejections}
                </Typography>
            </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Section 1 - Welcome and Recent Applications */}
        <div className="section section-1">
          <Typography variant='h4'>
            Welcome back ...
          </Typography>

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
