import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import Barside from './Barside';
import './Applications.css';
import jobTags from './jobTags.json';

const Preferences = ({userData, setUserData}) => {
  const [selectedField, setSelectedField] = useState('');
  const [selectedFunction, setSelectedFunction] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedTool, setSelectedTool] = useState('');


  const handleSubmit = () => {
    setUserData({
      ...userData, interests: [
        selectedField, selectedFunction, selectedSkill, selectedTool
      ]
    });
  };

  return (
    <div className="applications-container">
        <Barside userData={userData} />
        <div className="main-content">
        {/* Main Content */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%', maxWidth: 400, p: 4 }}>
        <Typography variant="h5">Set Your Preferences</Typography>

        <FormControl fullWidth>
          <InputLabel>Field of Study</InputLabel>
          <Select value={selectedField} onChange={e => setSelectedField(e.target.value)} label="Field of Study">
            {jobTags.fields_of_study.map((field, i) => (
              <MenuItem key={i} value={field}>{field}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Job Function</InputLabel>
          <Select value={selectedFunction} onChange={e => setSelectedFunction(e.target.value)} label="Job Function">
            {jobTags.job_functions.map((func, i) => (
              <MenuItem key={i} value={func}>{func}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Skill</InputLabel>
          <Select value={selectedSkill} onChange={e => setSelectedSkill(e.target.value)} label="Skill">
            {jobTags.skills.map((skill, i) => (
              <MenuItem key={i} value={skill}>{skill}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Tool</InputLabel>
          <Select value={selectedTool} onChange={e => setSelectedTool(e.target.value)} label="Tool">
            {jobTags.tools.map((tool, i) => (
              <MenuItem key={i} value={tool}>{tool}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Preferences
        </Button>
      </Box>
      </div>
    </div>
  );
};

export default Preferences;
