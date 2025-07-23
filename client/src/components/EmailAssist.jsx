import React, { useState } from 'react';
import { Box, Typography, TextField, Divider, Button } from '@mui/material';
import Barside from './Barside';

const EmailAssist = ({ userData, URL, setUserData }) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
  	const [companyName, setCompanyName] = useState('');
  	const [jobTitle, setJobTitle] = useState('');
  	const [jobDescription, setJobDescription] = useState('');
  	const [generatedText, setGeneratedText] = useState('Generated content will appear here.');

  	const generateEmail = () => {
		fetch(`${URL}/generate-email`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				companyName: companyName,
				jobTitle: jobTitle,
				jobDescription: jobDescription
			})
		})
		.then(response => response.json())
		.then(data => {
			if (data.email) {
				setGeneratedText(data.email);
			} else {
				setGeneratedText('Failed to generate email. Please try again later.');
			}
		})
	}

  	return (
		<>
		<Barside userData={userData} />
		<Box sx={{ marginLeft: '300px', padding: '20px' }}>
			<Typography variant="h4" gutterBottom>
			Email Assistance
			</Typography>

			<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				gap: 4,
				alignItems: 'flex-start',
				marginTop: '20px'
			}}
			>
			{/* Left Box */}
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '40%' }}>
				
				<Typography 
					variant="h6"
					sx={{mt: 3}}
				>
					Search company contact:
				</Typography>

				<TextField
					label="Contact's First Name"
					variant="outlined"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					sx={{mb: 2, width: '300px'}}
				/>

				<TextField
					label="Contact's Last Name"
					variant="outlined"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					sx={{mb: 2, width: '300px'}}
				/>

				<TextField
					label="Company Name"
					variant="outlined"
					value={companyName}
					onChange={(e) => setCompanyName(e.target.value)}
					sx={{mb: 2, width: '300px'}}
				/>

				<TextField
					label="Job Title"
					variant="outlined"
					value={jobTitle}
					onChange={(e) => setJobTitle(e.target.value)}
					sx={{mb: 2, width: '300px'}}
				/>

				<TextField
					multiline
					label="Job Description"
					variant="outlined"
					value={jobDescription}
					rows={4}
					onChange={(e) => setJobDescription(e.target.value)}
					sx={{mb: 2, width: '350px'}}
				/>

				<Button
					onClick={generateEmail} 
					variant="contained" 
					color="primary"
					sx={{width: '300px'}}
				>
					Generate
				</Button>
			</Box>

			{/* Right Box */}
			<Box
				sx={{ 
				flexGrow: 1,
				mt: 9
			}}>
				<TextField
					label="Generated Email"
					multiline
					rows={15}
					variant="outlined"
					value={generatedText}
					InputProps={{ readOnly: true }}
					fullWidth
				/>	
			</Box>
			</Box>
		</Box>
		</>
	);
};

export default EmailAssist;
