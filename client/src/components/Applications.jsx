// src/components/Applications.js
import React from 'react';
import { Box, Typography, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useNavigate } from 'react-router-dom';

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

const Applications = () => {
  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>Applications 📄</Typography>

      <Box mb={2} display="flex" gap={2}>
        <Button variant="outlined">📌 Bookmarked</Button>
        <Button variant="outlined">🏷️ Tags</Button>
        <Button variant="outlined">🏢 Company</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Company</strong></TableCell>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Tags</strong></TableCell>
              <TableCell></TableCell> {/* Bookmark icon column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleData.map((app, index) => (
              <TableRow key={index}>
                <TableCell>{app.company}</TableCell>
                <TableCell>{app.title}</TableCell>
                <TableCell>
                  {app.tags.map((tag, i) => (
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// Optional: Tag color helper
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
