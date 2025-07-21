// src/components/Sidebar.js
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Barside.css'; // Or create a Sidebar.css if you'd prefer to separate it
import { ListItem, Box, List, Typography, Chip } from '@mui/material';

const Barside = ({userData}) => {

  const navigate = useNavigate();

  return (
    <Box 
      sx={{
        position: "fixed",
        padding: "20px",
        width: "200px", 
        backgroundColor: "#2563EB",
        height: "100vh",
        color: "white"
      }}
    >
      <Typography variant='h5' fontWeight="bold" ml={2} mt={2}>
        TRACKR
      </Typography>
      <List sx={{marginTop: "40px", marginBottom: "20px"}}>
        <ListItem sx={{marginBottom: "20px", cursor: "pointer"}} onClick={() => navigate('/')}>Home</ListItem>
        <ListItem sx={{marginBottom: "20px", cursor: "pointer"}} onClick={() => navigate('/applications')}>Applications</ListItem>
        <ListItem sx={{marginBottom: "20px", cursor: "pointer"}} onClick={() => navigate('/resume')}>Resume/CV</ListItem>
        <ListItem  sx={{marginBottom: "20px", cursor: "pointer"}} onClick={() => navigate('/preferences')}> About/Preferences </ListItem>
        <ListItem sx={{marginBottom: "20px", cursor: "pointer"}} onClick={() => navigate('/recommendations')}>Recommendations</ListItem>
      </List>

      <Box 
        sx={{
          position: "fixed",
          left: "8px",
          bottom: "5px",
          display: "flex", 
          flexDirection: "column",
          backgroundColor: "white",
          color: 'black',
          border: "1px solid", 
          borderColor: "#ccc", 
          padding: "10px", 
          borderRadius: "5px",
          height: "200px",
          width: "200px"
        }}
      >
        <Typography variant='h6' fontWeight="bold">
          About/Preferences:
        </Typography>
        
        <Box mt={2}>
          {userData.interests.map((interest, index) => (
            <Chip 
              key={index}
              label={interest}
              size="small"
              sx={{ mr: 1, mb:1 }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Barside;
