// components/Signup.js
import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Link, Alert, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';



const Signup = ({URL, setLoggedin, loggedIn}) => {
  const [message, setMessage] = useState('');
  const [failed, setFailed] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      console.log("isLoggedIn: ", loggedIn);
      navigate("/");
    }
  }, [loggedIn])

  console.log("The URL: ", URL);

  const handleTogglePassword = () => setShowPassword(prev => !prev);

  const createAccount = () => {
    // get the different values
    var payload = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      email: email,
      password: password,
      role: role
    }

    // fetch api endpoint
    fetch(`${URL}/create-user`, {
      method: "POST",
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify({user: payload})
    })
    .then(res => res.json())
    .then(payload => {
      if (payload.message === 'This email address is already used by another user' ||
          payload.message === 'There was an issue creating a new account'
      ) {
        console.log(payload.message);
        setMessage(payload.message);
        setFailed(true);
      }
      else {
        setFailed(false);
        console.log("isLoggedIn: ", loggedIn);
        setLoggedin(true);
      }
    });
  }

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
        {failed && (
          <Alert severity='error'>{message}</Alert>
        )}
        <TextField 
          label="First Name" 
          fullWidth 
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField 
          label="Middle Name" 
          fullWidth 
          margin="normal" 
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <TextField 
          label="Last Name" 
          fullWidth 
          margin="normal" 
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          type='date'
          label="Date of Birth"
          fullWidth 
          margin="normal" 
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField 
          label="Email" 
          fullWidth margin="normal" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField 
          label="Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Role (e.g. Developer, Student...)" 
          fullWidth
          margin="normal"
          value={role}
          onChange={(e)=> setRole(e.target.value)}
        />
        <Button 
          variant="contained" 
          color="secondary"
          fullWidth
          onClick={createAccount}
        >
          Create Account
        </Button>
        <Typography mt={2} align="center">
          <Link href="/login" color='secondary'>Already have an account? Login</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;
