import React, { useEffect, useState } from 'react';
import Home from './components/Home';

import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Applications from './components/Applications';
import ResumeCV from './components/ResumeCV';
import Preferences from './components/Preferences';

function App() {

  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const TAGS = ["", "SWE", "Education", ];
  const [userData, setUserData] = useState({
    // userId: "08900056-4fda-11f0-bb87-22000e09c1f8",
    userId: "",
    numberOfApplications: 0,
    numberOfInterviews: 0,
    numberOfAcceptance: 0,
    numberOfRejections: 0,
    listOfApplications: [], // all applications
    interests: []
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
        setupData(userData, data.applications);
        // setUserData({...userData, listOfApplications: data.applications});
        console.log("userdata getapp 2: ", userData);
    })
  };

  const setupData = (userData, applications) => {
    let acceptance = 0;
    let rejections = 0;
    let interviews = 0;
    for (let i = 0; i < userData.listOfApplications.length; i++) {
      if (userData.listOfApplications[i].Status === "Accepted") {
        acceptance++;
      } else if (userData.listOfApplications[i].Status === "Rejected") {
        rejections++;
      } else {
        interviews++;
      }
    }
    console.log("UserData from setup data: ", userData);
    console.log("Applications from setup data: ", applications);
    setUserData({
      ...userData, 
      listOfApplications: applications,
      numberOfApplications: applications.length,
      numberOfInterviews: interviews,
      numberOfAcceptance: acceptance,
      numberOfRejections: rejections
    });
  };

  
  useEffect(() => {
    console.log("Hello: ", ENV.VITE_APP_BACKEND_URL);
    
    if (userData.userId) {
      getApplication();
    }

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
          <Route path="/" element={ loggedIn ? <Home key={userData.userId} userData={userData} /> : <Navigate to="/login" /> } />
          <Route path="/login" element={ loggedIn ? <Navigate to="/dashboard" /> : <Login URL={ENV.VITE_APP_BACKEND_URL} setLoggedIn={setLoggedIn} loggedIn={loggedIn} userData={userData} setUserData={setUserData} getApps={getApplication}/>} />
          <Route path="/signup" element={ <Signup URL={ENV.VITE_APP_BACKEND_URL} setLoggedin={setLoggedIn} loggedIn={loggedIn} userData={userData} />} />
          <Route path="/applications" element={ <Applications userData={userData} URL={ENV.VITE_APP_BACKEND_URL} getApps={getApplication}/> } />
          <Route path="/resume" element={ <ResumeCV URL={ENV.VITE_APP_BACKEND_URL} userData={userData} /> } />
          <Route path="/preferences" element={ <Preferences userData={userData}/> } />
          
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
