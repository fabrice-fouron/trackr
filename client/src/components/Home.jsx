// src/components/Home.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Barside from './Barside';
import { Box, Card, CardContent, Typography, List, ListItem, TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody, Chip } from '@mui/material';

const Home = ({userData}) => {

  const [interests, setInterests] = useState(['swe', 'vscode', 'developer'])

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
        <Box>
          <Typography variant='h4'>
            Welcome back ...
          </Typography>

            <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Company</strong></TableCell>
                  <TableCell><strong>Title</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.listOfApplications.slice(0,7).map((app, index) => (
                  <TableRow key={index}>
                    <TableCell>{app.CompanyName}</TableCell>
                    <TableCell>{app.JobPosition}</TableCell>
                    
                    <TableCell
                      sx={{color: (()=>statusColor(app.Status))}}>
                      {app.Status}
                    </TableCell>
                    <TableCell>
                      {/* Drop Down Button */}
                      <DropDown application={app}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Section 4 - Apply to jobs */}
        {/* <div className="section section-4">
          <h3>Apply To Jobs:</h3>
          <div className="apply-icons">
            <a href="#"><img src="linkedin-icon.png" alt="LinkedIn" /></a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
