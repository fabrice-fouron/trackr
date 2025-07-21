import React, { useState } from 'react';

import { Dialog, DialogContent, Typography } from '@mui/material';


const AppViewer = ({ application, open, setIsOpen }) => {

  const handleClose = () => {
    setIsOpen(false);
  };

  // console.log("Application in AppViewer:", application);

  return (
    application ?
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogContent>
        {/* <h2>Application Details</h2> */}
        <Typography variant="h6" gutterBottom>
          Application Details
        </Typography>

        <Typography variant="h6" gutterBottom>
          <strong>Company:</strong> {application.CompanyName}
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          <strong>Title:</strong> {application.JobPosition}
        </Typography>

        <Typography variant="h6" gutterBottom>
          <strong>Description:</strong> {application.JobDescription}
        </Typography>

        <Typography variant="h6" gutterBottom>
          <strong>Status:</strong> {application.Status}
        </Typography>

        <Typography variant="h6" gutterBottom>
          <strong>Date applied:</strong> {application.DateApplied.split("T")[0]}
        </Typography>

        <Typography variant="h6" gutterBottom>
          <strong>Tags:</strong> {application.Tags}
        </Typography>
        {/* <p><strong>Company:</strong> {application.CompanyName}</p>
        <p><strong>Title:</strong> {application.JobPosition}</p> */}
        {/* <p><strong>Description:</strong> {application.JobDescription}</p>
        <p><strong>Status:</strong> {application.Status}</p>
        <p><strong>Date Applied:</strong> {application.DateApplied}</p> */}
        {/* <p><strong>Tags:</strong> {application.Tags ? application.Tags.split(",").join(", ") : "None"}</p> */}
      </DialogContent>
    </Dialog> 
    :
    <>
    </>
  );
}

export default AppViewer;
