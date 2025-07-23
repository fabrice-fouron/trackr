import React, { useEffect, useState } from 'react';
import Home from './components/Home';

import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Applications from './components/Applications';
import ResumeCV from './components/ResumeCV';
import Preferences from './components/Preferences';
import Recommendations from './components/Recommendations';
import EmailAssist from './components/EmailAssist';

function App() {

  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    userId: "",
    numberOfApplications: 0,
    numberOfInterviews: 0,
    numberOfAcceptance: 0,
    numberOfRejections: 0,
    listOfApplications: [], // all applications
    interests: [],
    recommendations: [] // will hold the recommendations
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
    })
  };

  const getRecommendation = () => {
    fetch(`${ENV.VITE_APP_BACKEND_URL}/get-recommendations`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        userId: userData.userId,
        interests: userData.interests
      })
    })
    .then(res => res.json())  
    .then(data => {
      console.log("RECOMMENDATIONS: ", data.recommendations);
      setUserData({
        ...userData,
        recommendations: data.recommendations
      }); 
    })
    .catch(err => console.error("Error fetching recommendations:", err));
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
    // console.log("UserData from setup data: ", userData);
    // console.log("Applications from setup data: ", applications);
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
    // console.log("Hello: ", ENV.VITE_APP_BACKEND_URL);
    
    if (userData.userId) {
      getApplication();
    }

    fetch(`${ENV.VITE_APP_BACKEND_URL}/api/test`)
      .then(res => res.json())
      .then(data => setMessage(data.message))
    }, []);
    // console.log(message);
    // console.log(userData.listOfApplications);

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
          <Route path="/applications" element={ loggedIn ? <Applications userData={userData} URL={ENV.VITE_APP_BACKEND_URL} getApps={getApplication} setUserData={setUserData}/> : <Navigate to="/login" />} />
          <Route path="/resume" element={ loggedIn ? <ResumeCV URL={ENV.VITE_APP_BACKEND_URL} userData={userData} /> : <Navigate to="/login" />} />
          <Route path="/preferences" element={ <Preferences userData={userData} setUserData={setUserData}/> } />
          <Route path="/recommendations" element={ loggedIn ? <Recommendations userData={userData} URL={ENV.VITE_APP_BACKEND_URL} getRecs={getRecommendation} setUserData={setUserData}/> : <Navigate to="/login"/>} />
          <Route path="/email-assist" element={ <EmailAssist userData={userData} URL={ENV.VITE_APP_BACKEND_URL} setUserData={setUserData} />} />
          {/* Optionally, a "dashboard" route that shows additional components */}
          <Route
            path="/dashboard"
            element={
              loggedIn ? (
                <Home userData={userData} />
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
