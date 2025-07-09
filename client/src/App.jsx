import { Input, Button } from '@mui/material';
import Home from './components/Home';
import React, { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ResumeUploader from './components/ResumeUploader';
import ResumeViewer from './components/ResumeViewer';
import Login from './components/Login';
import Signup from './components/Signup';
import Applications from './components/Applications';
import Barside from './components/Barside';
import ResumeCV from './components/ResumeCV';

function App() {
  const [userData, setUserData] = useState({}); // will hold the user data while using the web app
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState('08900056-4fda-11f0-bb87-22000e09c1f8')
  const [listApplications, setListApplications] = useState([]);
  const ENV = import.meta.env;

  const getApplication = () => {
    fetch(`${ENV.VITE_APP_BACKEND_URL}/get-application`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        userId: userId
      })
    })
    .then(res => res.json())
    .then(data => {
        console.log("PRINTING DATA: ", data.applications);
        setListApplications(data.applications);
    })
  };

  
  
  useEffect(() => {
    console.log("Hello: ", ENV.VITE_APP_BACKEND_URL);
    
    getApplication();

    fetch(`${ENV.VITE_APP_BACKEND_URL}/api/test`)
      .then(res => res.json())
      .then(data => setMessage(data.message))
    }, []);
    console.log(message);
    console.log(listApplications);

  return (
    <BrowserRouter>
      <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
        {/* <p>Message from backend: {message}</p> */}
        <Routes>
          {/* If user is not logged in, force them to /login */}
          <Route path="/" element={ loggedIn ? <Home userId={userId} /> : <Navigate to="/login" /> } />
          <Route path="/login" element={ loggedIn ? <Navigate to="/dashboard" /> : <Login URL={ENV.VITE_APP_BACKEND_URL} setLoggedIn={setLoggedIn} setUserId={setUserId} />} />
          <Route path="/signup" element={ <Signup URL={ENV.VITE_APP_BACKEND_URL} setLoggedin={setLoggedIn} loggedIn={loggedIn} />} />
          <Route path="/applications" element={ <Applications listApplications={listApplications} /> } />
          <Route path="/resume" element={ <ResumeCV URL={ENV.VITE_APP_BACKEND_URL} userId={userId} /> } />
          {/* Optionally, a "dashboard" route that shows additional components */}
          <Route
            path="/dashboard"
            element={
              loggedIn ? (
                <>
                  <Home userId={userId} />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
