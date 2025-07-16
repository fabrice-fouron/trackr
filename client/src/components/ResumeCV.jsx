// src/components/Resume.js
import React from 'react';
import { Box, Typography, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useNavigate } from 'react-router-dom';
import Barside from './Barside';
import ResumeUploader from './ResumeUploader';
import ResumeViewer from './ResumeViewer';

const ResumeCV = ({URL, userData}) => {
  const navigate = useNavigate();

  return (
    <div className="resume-container">
      <Barside />
      {/* Main Content */}
<<<<<<< HEAD
      <div className="main-content">
        <Typography variant="h4" gutterBottom>Resume/CV 📄</Typography>
=======
      <Box className="main-content" sx={{display: "flex"}}>
        <Typography variant="h5" gutterBottom>Resume/CV 📄</Typography>
>>>>>>> 2aeae4a0b7ec487ce3624c7ff5c4442c4f6a09a0
        <Box sx={{ mb: 2 }}>
            <ResumeUploader URL={URL} userId={userData.userId} />
            <Typography variant="body1">View and manage your resume here.</Typography>
        </Box>
        <br />
        <ResumeViewer URL={URL} userId={userData.userId} />
      </Box>
    </div>
  )
}
export default ResumeCV;
