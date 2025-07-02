import { Input, Button } from '@mui/material';
import Home from './components/Home';
import React, { useEffect, useState } from 'react';
import ResumeUploader from './components/ResumeUploader';
import ResumeViewer from './components/ResumeViewer';

function App() {
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState('08900056-4fda-11f0-bb87-22000e09c1f8')
  const ENV = import.meta.env;
  
  console.log("Hello: ", ENV.VITE_APP_BACKEND_URL);
  useEffect(() => {
    fetch(`${ENV.VITE_APP_BACKEND_URL}/api/test`)
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <p>message from backend: {message}</p>
      <Home />
      <ResumeUploader URL={ENV.VITE_APP_BACKEND_URL} userId={userId}/>
      <ResumeViewer URL={ENV.VITE_APP_BACKEND_URL} userId={userId}/>
    </div>
  );
}

export default App;
