import { Input, Button } from '@mui/material';
import Home from './components/Home';
import React, { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Applications from './components/Applications';
import Barside from './components/Barside';
import ResumeCV from './components/ResumeCV';

function App() {


  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const TAGS = ["", "SWE", "Education", ]
  // const [listApplications, setListApplications] = useState([]);
  const [userData, setUserData] = useState({
    userId: "08900056-4fda-11f0-bb87-22000e09c1f8",
    numberOfApplications: 0,
    numberOfInterviews: 0,
    numberofAccepted: 0,
    listOfApplications: []
  }); // will hold the user data while using the web app

  const ENV = import.meta.env;

  const getApplication = () => {
    fetch(`${ENV.VITE_APP_BACKEND_URL}/get-application`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        userId: userData.userId
      })
    })
    .then(res => res.json())
    .then(data => {
        console.log("PRINTING DATA: ", data.applications);
        setUserData({...userData, listOfApplications: data.applications});
        console.log("userdata: ", userData);
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
    console.log(userData.listOfApplications);

  return (
    <BrowserRouter>
      {/* <div style={{ padding: '2rem', fontFamily: 'Arial' }}> */}
      <div style={{ fontFamily: 'Arial' }}>
        {/* <p>Message from backend: {message}</p> */}
        <Routes>
          {/* If user is not logged in, force them to /login */}
          <Route path="/" element={ loggedIn ? <Home userData={userData} /> : <Navigate to="/login" /> } />
          <Route path="/login" element={ loggedIn ? <Navigate to="/dashboard" /> : <Login URL={ENV.VITE_APP_BACKEND_URL} setLoggedIn={setLoggedIn} setUserData={setUserData} />} />
          <Route path="/signup" element={ <Signup URL={ENV.VITE_APP_BACKEND_URL} setLoggedin={setLoggedIn} loggedIn={loggedIn} />} />
          <Route path="/applications" element={ <Applications userData={userData} /> } />
          <Route path="/resume" element={ <ResumeCV URL={ENV.VITE_APP_BACKEND_URL} userData={userData} /> } />
          {/* Optionally, a "dashboard" route that shows additional components */}
          <Route
            path="/dashboard"
            element={
              loggedIn ? (
                <>
                  <Home userData={userData} />
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
