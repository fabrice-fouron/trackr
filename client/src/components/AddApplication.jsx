import React, { useState } from 'react';
import { Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Box, Typography, TextField, Select, MenuItem, InputLabel, FormControl, Autocomplete } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import allTags from './allTags.json';



const AddApplication = ({userData, backend_URL, updateData}) => {

  const [open, setOpen] = useState(false);

  // Data to be sent
  const [URL, setURL] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyContact, setCompanyContact] = useState("");
  const [companyContactEmail, setCompanyContactEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setDescription] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [dateApplied, setDateApplied] = useState("");
  const [status, setStatus] = useState("Applied");
  const tagOptions = [...allTags.allTags];


  
  const reset = () => {
    setURL("");
    setCompanyName("");
    setCompanyContact("");
    setCompanyContactEmail("");
    setDepartment("");
    setJobPosition("");
    setDescription("");
    setKeywords([]);
    setDateApplied("");
    setStatus("Applied");
  }
  
  const sendData = () => {
    console.log("USERID SENDDATA:", userData.userId)
    const payload = {
      application: {
        applicantId: userData.userId,
        url: URL,
        companyName: companyName,
        companyContact: companyContact,
        companyContactEmail: companyContactEmail,
        department: department,
        jobPosition: jobPosition,
        jobDescription: jobDescription,
        tags: keywords.join(','),
        dateApplied: dateApplied,
        status: status
      }
    };

    console.log(dateApplied);

    fetch(`${backend_URL}/create-application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      console.log("Success add of application:", data);
      if (typeof updateData === 'function') {
        updateData();
      }
      reset();
    });
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (e) => {
    const { id, value } = e.target;

    console.log("Value: ", value);
    
    switch(id) {
      case 'url':
        setURL(value);
        break;
      
      case 'company-name':
        setCompanyName(value);
        break;

      case 'company-contact':
        setCompanyContact(value);
        break;

      case 'contact-email':
        setCompanyContactEmail(value);
        break;

      case 'department':
        setDepartment(value);
        break;

      case 'job-position':
        setJobPosition(value);
        break;

      case 'job-description':
        setDescription(value);
        break;

      case 'keywords':
        setKeywords(value);
        break;

      case 'date-applied':
        setDateApplied(value);
        break;

      case 'app-status':
        setStatus(value);
        break;

      default:
        break;
    }
  };

  const handleSend = () => {
    console.log(dateApplied);
    sendData();
    console.log("Data was sent");
    handleClose();
  }
 
  const handleCancel = () =>  {

  }

  return (
    <>
      <Fab 
        color="primary"
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
        <DialogTitle sx={{marginBottom: "10px", marginTop: "5px"}}><strong>Create a New Application</strong></DialogTitle>
        <DialogContent sx={{display: "flex"}}>

          {/* Left Side */}
          <Box sx={{justifyContent: "flex-start", paddingRight: "10px", flexDirection: "column"}}>
            <TextField
              id='url'
              label="URL" 
              sx={{
                marginBottom: "20px"
              }}
              onChange={handleChange}
              value={URL}
              required
            />

            <TextField 
              id='company-name'
              label="Company name"
              sx={{
                marginBottom: "20px"
              }}
              onChange={handleChange}
              value={companyName}
              required
            />

            <TextField 
              id='company-contact'
              label="Company contact"
              sx={{
                marginBottom: "20px"
              }}
              onChange={handleChange}
              value={companyContact}
            />

            <TextField
              id='contact-email'
              label="Contact email"
              sx={{
                marginBottom: "20px"
              }}
              onChange={handleChange}
              value={companyContactEmail}
            />

            <TextField
              id='department'
              label="Department"
              sx={{
                marginBottom: "0px"
              }}
              onChange={handleChange}
              value={department}
            />

          </Box>

          {/* Right Side */}
          <Box sx={{justifyContent: "flex-end", paddingLeft: "10px", flexDirection: "column"}}>
            <TextField 
              id='job-position'
              label="Job position"
              sx={{
                marginBottom: "20px"
              }}
              onChange={handleChange}
              value={jobPosition}
              required
            />

            <TextField 
              id='job-description'
              label="Job description"
              sx={{
                marginBottom: "20px"
              }}
              onChange={handleChange}
              value={jobDescription}
              required
            />

            <Autocomplete
              multiple
              freeSolo
              id="keywords-autocomplete"
              options={tagOptions}
              value={keywords}
              onChange={(event, newValue) => setKeywords(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Keywords"
                  sx={{ marginBottom: "20px" }}
                  required
                />
              )}
            />

            <TextField 
              id='date-applied'
              label="Date Applied"
              sx={{
                marginBottom: "20px",
                marginRight: "80px"
              }}
              InputLabelProps={{shrink: true}}
              type='date'
              value={dateApplied}
              onChange={handleChange}
              required
            />

            <FormControl sx={{ marginRight: "80px"}}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                id="app-status"
                labelId="status-label"
                value={status}
                label="Status"
                onChange={e => setStatus(e.target.value)}
              >
                <MenuItem value="Applied">Applied</MenuItem>
                <MenuItem value="Interview">Interview</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions sx={{justifyContent: "flex-end"}}>
          <IconButton sx={{color: 'red'}} onClick={handleCancel}>
            <DeleteIcon />
          </IconButton>

          <IconButton sx={{color: 'green'}} onClick={handleSend}>
            <SendIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddApplication;
