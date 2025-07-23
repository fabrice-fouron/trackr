// src/components/Applications.js
import React, { useState } from 'react';
import { Box, Typography, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Applications.css';
import Barside from './Barside';
import DropDown from './DropDown';
import AddApplication from './AddApplication';
import AppViewer from './AppViewer';


const Applications = ({userData, URL, getApps, setUserData}) => {
  const navigate = useNavigate();

  const [appView, setAppView] = useState(false);
  const [appIndex, setAppIndex] = useState(0);


  // delete a given application
  const deleteApp = (index) => {
    // fetch api endpoint to delete record
    fetch(`${URL}/delete-application`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        userId: userData.userId,
        applicationId: userData.listOfApplications[index].Id
      })
    })
    // delete from the frontend userData
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        // Update the userData to remove the deleted application
        const updatedApplications = userData.listOfApplications.filter((_, i) => i !== index);
        setUserData({...userData, listOfApplications: updatedApplications});
        getApps(); // Refresh the applications list
      } else {
        console.error("Failed to delete application");
      }
    })
  }
 
  const viewApp = (index) => {
    // Navigate to the view application page with the application ID
    console.log("Viewing application at index:", appIndex);
    setAppIndex(index);
    console.log("APPLICATION", userData.listOfApplications[appIndex]);
    setAppView(true);
  }

  return (
    <div className="applications-container">
      <Barside userData={userData} />
      {/* Main Content */}
      <div className="main-content">
        <Typography variant="h5" gutterBottom>Applications 📄</Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell><strong>URL</strong></TableCell> */}
                <TableCell><strong>Company</strong></TableCell>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Tags</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.listOfApplications.map((app, index) => (
                <TableRow key={index}>
                  {/* <TableCell>{app.URL}</TableCell> */}
                  <TableCell>{app.CompanyName}</TableCell>
                  <TableCell>{app.JobPosition}</TableCell>
                  <TableCell sx={{"textOverflow": "ellipsis"}}>{app.JobDescription}</TableCell>
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
                    <DropDown application={app} deleteApp={deleteApp} id={index} viewApp={viewApp}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <AddApplication userData={userData} backend_URL={URL} updateData={getApps} />
      <AppViewer application={userData.listOfApplications[appIndex]} open={appView} setIsOpen={setAppView}/>
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
  const listOfColor = ["primary", "secondary", "success", "warning", "error"];
  return listOfColor[Math.floor((Math.random() * 5))];
};
export default Applications;
