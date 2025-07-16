// src/components/Sidebar.js
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Barside.css'; // Or create a Sidebar.css if you'd prefer to separate it
import { ListItem, Box, List, Typography, Chip } from '@mui/material';

const Barside = () => {

  const navigate = useNavigate();
  const [interests, setInterests] = useState(['swe', 'vscode', 'developer']);

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
        Trackr
      </Typography>
      <List sx={{marginBottom: "20px"}}>
        <ListItem sx={{marginBottom: "20px"}} onClick={() => navigate('/')}>Home</ListItem>
        <ListItem sx={{marginBottom: "20px"}} onClick={() => navigate('/applications')}>Applications</ListItem>
        <ListItem sx={{marginBottom: "20px"}} onClick={() => navigate('/resume')}>Resume/CV</ListItem>
        <ListItem  sx={{marginBottom: "20px"}} onClick={() => navigate('/preferences')}> About/Preferences </ListItem>
        {/* <li onClick={() => navigate('/interview')}>Prepare for Interview</li> */}
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
          height: "400px",
          width: "200px"
        }}
      >
        <Typography variant='h6' fontWeight="bold">
          About/Preferences:
        </Typography>
        
        <Box mt={2}>
          {interests.map((interest, index) => (
            <Chip 
              key={index}
              label={interest}
              size="small"
              sx={{ mr: 1 }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Barside;
