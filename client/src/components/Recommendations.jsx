import React, { useState } from 'react';
import { Box, Typography, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Applications.css';
import Barside from './Barside';
import DropDown from './DropDown';
import AppViewer from './AppViewer';

const Recommendations = ({userData, URL, getApps, setUserData}) => {
    return(
        <div className="applications-container">
            <Barside userData={userData} />
        </div>
    );
}
export default Recommendations;