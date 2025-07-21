import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Menu, MenuItem, Box, TextField, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // or use any icon

const DropDown = ({application, deleteApp, id, viewApp}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [URL, setURL] = useState(application);

  const [companyName, setCompanyName] = useState(application.CompanyName);
  const [companyContact, setCompanyContact] = useState(application.companyContact);
  const [companyContactEmail, setCompanyContactEmail] = useState(application.companyContactEmail);
  const [department, setDepartment] = useState(application.department);
  const [jobPosition, setJobPosition] = useState(application.jobPosition);
  const [jobDescription, setDescription] = useState(application.jobDescription);
  const [keywords, setKeywords] = useState(application.keywords);
  const [dateApplied, setDateApplied] = useState(application.dateApplied);
  const [status, setStatus] = useState(application.status);

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
        <MenuItem onClick={() => {viewApp(id)}}>View</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default DropDown;
