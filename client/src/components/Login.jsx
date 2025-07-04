// components/Login.js
import React, {useEffect, useState} from 'react';
import { Box, Button, TextField, Typography, Link, Alert } from '@mui/material';
// import * as crypto from 'crypto';
import { useNavigate } from 'react-router-dom';

const Login = ({URL, setLoggedIn, loggedIn}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      // navigate("/");
    }
  }, [loggedIn])

  const getUser = () => {
    // var hash = crypto.createHash('sha256');

    const payload = {
      email: email,
      password: password
    }

    fetch(`${URL}/get-user`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(output => {
      if (output.message === "Make sure email and password are correct") {
        setMessage(output.message)
        setLoginFailed(true);
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
        <Typography variant="h5" mb={2}>Login</Typography>
        { loginFailed && (
          <Alert severity='error'>{message}</Alert>
        )}
        <TextField 
          label="Email" 
          fullWidth 
          margin="normal" 
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
        />
        <Button 
          variant="contained" 
          color="secondary" 
          fullWidth
          onClick={getUser}
        >
          Login
        </Button>
        <Typography mt={2} align="center">
          <Link href="/signup" color="secondary">Don't have an account? Sign up</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
