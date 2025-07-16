// src/components/Applications.js
import React, { useState } from 'react';
import { Box, Typography, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Applications.css';
import Barside from './Barside';
import DropDown from './DropDown';
import AddApplication from './AddApplication';


const Applications = ({userData, URL}) => {
  const navigate = useNavigate();
  console.log("PRINTING FROM THE COMPONENT: ", userData.listOfApplications);
  return (
    <div className="applications-container">
      <Barside />
      {/* Main Content */}
      <div className="main-content">
        <Typography variant="h5" gutterBottom>Applications 📄</Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Company</strong></TableCell>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Tags</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.listOfApplications.map((app, index) => (
                <TableRow key={index}>
                  <TableCell>{app.CompanyName}</TableCell>
                  <TableCell>{app.JobPosition}</TableCell>
                  <TableCell>
                    {/* Tags */}
                    {app.Tags ? app.Tags.split(",").map((tag, i) => (
                      <Chip
                        key={i}
                        label={tag}
                        size="small"
                        sx={{ mr: 1, mb: 0.5 }} 
                        color={getChipColor(tag)}
                      />
                    )) : "None"}
                  </TableCell>
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
      </div>
      <AddApplication userData={userData} backend_URL={URL}/>
    </div>
  );
};

const statusColor = (status) => {
  const color = {
    "Applied": "green",
    "Interview": "blue",
    "Waiting": "orange",
    "Rejected": "red"
  }
  return color[status];
}

const getChipColor = () => {
  const listOfColor = ["primary", "secondary", "success", "warning", "info", "default", "black", "pink"];
  return listOfColor[Math.floor((Math.random() * 8))];
};
export default Applications;
