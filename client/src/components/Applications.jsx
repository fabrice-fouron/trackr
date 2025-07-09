// src/components/Applications.js
import React, { useState } from 'react';
import { Box, Typography, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useNavigate } from 'react-router-dom';
import './Applications.css';
import Barside from './Barside';

const sampleData = [
  {
    company: 'Amazon',
    title: 'SDE I Intern – 2 Months',
    tags: ['Internship', 'SWE', 'Summer'],
  },
  {
    company: 'Apple',
    title: 'Software Engineer, IS&T (Early Career)',
    tags: ['California', 'Early Career', 'SWE'],
  },
  {
    company: 'NVIDIA',
    title: 'Robot Learning Intern',
    tags: ['AI/ML', 'Internship', 'Fall'],
  },
];

const Applications = ({listApplications}) => {
  const navigate = useNavigate();
  console.log("PRINTING FROM THE COMPONENT: ", listApplications);
  return (
    <div className="applications-container">
      <Barside />
      {/* Main Content */}
      <div className="main-content">
        <Typography variant="h5" gutterBottom>Applications 📄</Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Company</strong></TableCell>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Tags</strong></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listApplications.map((app, index) =>  {console.log(`index ${index}:` ,app); return (
                <TableRow key={index}>
                  <TableCell>{app.CompanyName}</TableCell>
                  <TableCell>{app.JobPosition}</TableCell>
                  <TableCell>
                    {app.Tags.split(",").map((tag, i) => (
                      <Chip
                        key={i}
                        label={tag}
                        size="small"
                        sx={{ mr: 1, mb: 0.5 }}
                        color={getChipColor(tag)}
                      />
                    ))}
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <BookmarkBorderIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )}
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
const getChipColor = (tag) => {
  const map = {
    'Internship': 'primary',
    'SWE': 'success',
    'Summer': 'warning',
    'Fall': 'info',
    'AI/ML': 'secondary',
    'Early Career': 'default',
  };
  return map[tag] || 'default';
};
export default Applications;