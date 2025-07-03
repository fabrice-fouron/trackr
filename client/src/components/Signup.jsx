// components/Signup.js
import React from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';

const Signup = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box width={300} p={3} boxShadow={3} borderRadius={2} bgcolor="white">
        <Typography variant="h5" mb={2}>Sign Up</Typography>
        <TextField label="Full Name" fullWidth margin="normal" />
        <TextField label="Email" fullWidth margin="normal" />
        <TextField label="Password" type="password" fullWidth margin="normal" />
        <Button variant="contained" color="primary" fullWidth>Create Account</Button>
        <Typography mt={2} align="center">
          <Link href="/login">Already have an account? Login</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;
