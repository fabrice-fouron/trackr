import { Button } from '@mui/material';
import Home from './components/Home';
import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const ENV = import.meta.env;
  
  console.log("Helllo: ", ENV.VITE_APP_BACKEND_URL);
  useEffect(() => {
    fetch(`${ENV.VITE_APP_BACKEND_URL}/api/test`)
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <p>Message from server: <strong>{message}</strong></p>
      {/*<p>{loggedIn.toString()}</p>
      <Button onClick={
        ()=>{
          fetch(
            `${ENV.VITE_APP_BACKEND_URL}/login`, 
            {
              'method': "POST", 
              'body': JSON.stringify({"username": "fabrice", "password": "fabrice"})
            }
          ).then(res=>res.json()).then(data=>{console.log(data); setLoggedIn(data.loggedIn)})
        }} sx={{background: "#73969e", color: "white"}}> New Button
      </Button> */}
      <hr/>
      <Home />
    </div>
  );
}

export default App;
