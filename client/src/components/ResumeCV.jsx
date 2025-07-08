// src/components/Resume.js
import React from 'react';
import { Box, Typography, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useNavigate } from 'react-router-dom';
import Barside from './Barside';
import ResumeUploader from './ResumeUploader';
import ResumeViewer from './ResumeViewer';

const ResumeCV = ({URL, userId}) => {
  const navigate = useNavigate();

  return (
    <div className="applications-container">
      <Barside />
      {/* Main Content */}
      <div className="main-content">
        <Typography variant="h5" gutterBottom>Resume/CV 📄</Typography>
        <Box sx={{ mb: 2 }}>
            Upload Resume
            <ResumeUploader URL={URL} userId={userId} />
        </Box>
        <Typography variant="body1">View and manage your resume here.</Typography>
        <ResumeViewer URL={URL} userId={userId} />
      </div>
    </div>
  )
}
export default ResumeCV;
