import React, { useState } from 'react';
import { Box, Typography, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Menu, MenuItem, Icon } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useNavigate } from 'react-router-dom';
import './Applications.css';
import Barside from './Barside';
import DropDown from './DropDown';
import AppViewer from './AppViewer';



const Recommendations = ({userData, URL, getRecs}) => {

    return(
        <>
            <Barside userData={userData} />

            <Box sx={{marginLeft: "250px", padding: "20px"}}>
                <Typography variant="h5" gutterBottom>
                    Recommendations
                </Typography>
            </Box>
            <Box sx={{marginLeft: "250px", padding: "20px"}}>

                <TableContainer component={Paper}>
                    <Table>
                        {userData.recommendations && userData.recommendations.length > 0 && (
                            <TableHead>
                                    <TableRow>
                                        {/* <TableCell><strong>Company</strong></TableCell>
                                        <TableCell><strong>Title</strong></TableCell>
                                        <TableCell><strong>Description</strong></TableCell>
                                        <TableCell><strong>Status</strong></TableCell> */}
                                        <TableCell><strong>URL</strong></TableCell>
                                    </TableRow>
                            </TableHead>
                        )}
                        <TableBody>
                            {userData.recommendations && userData.recommendations.map((rec, index) => (
                                <TableRow key={index}>
                                    {/* <TableCell>{rec.companyName}</TableCell>
                                    <TableCell>{rec.jobTitle}</TableCell>
                                    <TableCell>{rec.jobDescription}</TableCell>
                                    <TableCell>{rec.status}</TableCell> */}
                                    <TableCell>
                                        <a href={rec.URL} target="_blank" rel="noopener noreferrer">
                                            {rec.URL}
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))}
                            { userData.recommendations && userData.recommendations.length === 0 && (
                                <TableRow key={0}>
                                <TableCell colSpan={5} align="center">
                                    <Typography variant="body2">No recommendations available at the moment.</Typography>
                                </TableCell>
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <IconButton 
                    onClick={() => getRecs(userData.interests)}
                    sx={{ marginTop: '20px', color: "green" }}>
                    <ReplayIcon />
                </IconButton>
            </Box>
        </>
    );
}
export default Recommendations;