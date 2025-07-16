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
      <div className="main-content">
        <Typography variant="h4" gutterBottom>Resume/CV 📄</Typography>
        <Box sx={{ mb: 2 }}>
            <ResumeUploader URL={URL} userId={userData.userId} />
            <Typography variant="body1">View and manage your resume here.</Typography>
        </Box>
        <br />
        <ResumeViewer URL={URL} userId={userData.userId} />
      </div>
    </div>
  )
}
export default ResumeCV;
