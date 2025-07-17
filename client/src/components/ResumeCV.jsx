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
      <Box sx={{display: "flex", direction: "row", paddingLeft: "15%", paddingTop: "2%"}}>
        <Box sx={{ mb: 2,  justifyContent:"flex-start", display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
            <Typography variant="h5" gutterBottom>Resume/CV 📄</Typography>
            <Typography variant="body1">View and manage your resume here.</Typography>
            <ResumeUploader URL={URL} userId={userData.userId} />
        </Box>
        <Box sx={{ mb: 2,  justifyContent:"flex-end", display: "flex", flexDirection: "column", width: "100%" }}>
            <ResumeViewer URL={URL} userId={userData.userId} />
        </Box>
      </Box>
    </div>
  )
}
export default ResumeCV;
