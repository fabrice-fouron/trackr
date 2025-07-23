import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Menu, MenuItem, Box, TextField, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // or use any icon
import { useEffect } from 'react';

const DropDown = ({userData, URL, application, deleteApp, id, viewApp, setUserData, setupData}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  // const [URL, setURL] = useState(application);

  const [companyName, setCompanyName] = useState(application.CompanyName);
  const [companyContact, setCompanyContact] = useState(application.companyContact);
  const [companyContactEmail, setCompanyContactEmail] = useState(application.companyContactEmail);
  const [department, setDepartment] = useState(application.department);
  const [jobPosition, setJobPosition] = useState(application.jobPosition);
  const [jobDescription, setDescription] = useState(application.jobDescription);
  const [keywords, setKeywords] = useState(application.keywords);
  const [dateApplied, setDateApplied] = useState(application.dateApplied);
  const [currentstatus, setStatus] = useState(application.Status);

  const [viewOpen, setViewOpen] = useState(false);

  const handleView = () => {
    viewApp(id);
  }

  const handleDelete = () => {
    deleteApp(id);
  }


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // open menu
  };

    useEffect(() => {
      if (userData && userData.listOfApplications && typeof setupData === 'function') {
        setupData(userData, userData.listOfApplications);
      }
  }, [userData.listOfApplications[id].Status]);

  const updateStatus = () => {
    console.log("Application Status: ", application.Status);
    var stat = application.Status;
    console.log("First STAT: ", application.Status);

    if (stat === "Applied") {
      stat = "Interview";
    } else if (stat === "Interview") {
      stat = "Accepted";
    } else if (stat === "Accepted") {
      stat = "Rejected";
    } else {
      stat = "Applied";
    }

    console.log("ID: ", id);
    console.log("Second STAT: ", stat);

    fetch(`${URL}/update-application-status`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        userId: userData.listOfApplications[id].userId,
        applicationId: application.Id,
        status: stat
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        setUserData(prev => ({
          ...prev,
          listOfApplications: prev.listOfApplications.map((app, index) => 
            application.Id === app.Id ? {...app, Status: stat} : app
          )
        }));
        console.log("Status updated successfully");
      } else {
        console.log("Failed to update status");
      }
      // setupData(userData, userData.listOfApplications);
    });
    
  }

  


  const handleClose = () => {
    setAnchorEl(null); // close menu
  };

  const handleCloseDialog = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
    console.log(application);
  }

  return (
    <Box>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle sx={{marginBottom: "10px"}}>
          Application Details
        </DialogTitle>
        <DialogContent>
          <Box sx={{display:"flex"}}>
            <Box sx={{justifyContent:"flex-start", marginRight: "10px"}}>
            <Typography variant='p'>
              {companyName}
            </Typography>
            </Box>
            <Box sx={{justifyContent:"flex-end", marginLeft: "10px"}}>
            <Typography variant='p'>

            </Typography>
            </Box>
          </Box>
        </DialogContent>

      </Dialog>
      
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {viewApp(id); console.log(userData.listOfApplications)}}>View</MenuItem>
        <MenuItem onClick={() => {updateStatus(id)}}>Update Status</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default DropDown;
