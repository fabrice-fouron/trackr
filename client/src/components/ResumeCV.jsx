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
    <div className="applications-container">
      <Barside />
      {/* Main Content */}
      <Box className="main-content" sx={{display: "flex"}}>
        <Typography variant="h5" gutterBottom>Resume/CV 📄</Typography>
        <Box sx={{ mb: 2 }}>
            Upload Resume
            <ResumeUploader URL={URL} userId={userData.userId} />
        </Box>
        <Typography variant="body1">View and manage your resume here.</Typography>
        <ResumeViewer URL={URL} userId={userData.userId} />
      </Box>
    </div>
  )
}
export default ResumeCV;
