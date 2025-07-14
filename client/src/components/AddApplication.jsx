import React, { useState } from 'react';
import { Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Box, Typography, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';


const AddApplication = () => {

  const [open, setOpen] = useState(false);

  const [status, setStatus] = useState("Applied");
  
  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    console.log("Updated Status:", newStatus);
  };


  return (
    <>
      <Fab 
        color="secondary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        {/* Application Info to fill out */}
        <DialogTitle><h4>Create a New Application</h4></DialogTitle>
        <DialogContent sx={{display: "flex"}}>
          
          {/* Left Side */}
          <Box sx={{justifyContent: "flex-start", paddingTop: "10px", paddingRight: "10px", flexDirection: "column"}}>
            <TextField 
              label="URL"
              sx={{
                marginBottom: "20px"
              }}
              required
            />

            <TextField 
              label="Company name"
              sx={{
                marginBottom: "20px"
              }}
              required
            />

            <TextField 
              label="Company contact"
              sx={{
                marginBottom: "20px"
              }}

            />

            <TextField
              label="Contact email"
              sx={{
                marginBottom: "0px"
              }}
            />
          </Box>

          {/* Right Side */}
          <Box sx={{justifyContent: "flex-end", paddingLeft: "10px", paddingTop: "10px", flexDirection: "column"}}>
            <TextField 
              label="Job position"
              sx={{
                marginBottom: "20px"
              }}
              required
            />

            <TextField 
              label="Job description"
              sx={{
                marginBottom: "20px"
              }}
              required
            />

            <TextField 
              label="Keywords"
              sx={{
                marginBottom: "20px"
              }}
              required
            />

            <TextField 
              label="Date Applied"
              sx={{
                marginBottom: "20px",
                marginRight: "80px"
              }}
              InputLabelProps={{shrink: true}}
              type='date'
              
              required
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions sx={{justifyContent: "flex-end"}}>
          <IconButton sx={{color: 'red'}} >
            <DeleteIcon />
          </IconButton>

          <IconButton
            sx={{
              color: 'green'
            }}>
            <SendIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddApplication;
