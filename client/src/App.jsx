import { Input, Button } from '@mui/material';
import Home from './components/Home';
import React, { useEffect, useState } from 'react';
import ResumeUploader from './components/ResumeUploader';

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
      <h1>HELLO WORLD</h1>
      <ResumeUploader />
    </div>
  );
}

export default App;
