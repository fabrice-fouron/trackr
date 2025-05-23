import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch('http://trackr-1d4.pages.dev/api/test')
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>React + Express Example</h1>
      <p>Message from server: <strong>{message}</strong></p>

      <p>{loggedIn.toString()}</p>
      <Button onClick={
        ()=>{
          fetch(
            'https://trackr-1d4.pages.dev/login', 
            {
              'method': "POST", 
              'body': JSON.stringify({"username": "fabrice", "password": "fabrice"})
            }
          ).then(res=>res.json()).then(data=>{console.log(data); setLoggedIn(data.loggedIn)})
        }} sx={{background: "#73969e", color: "white"}}> New Button
      </Button>
    </div>
  );
}

export default App;