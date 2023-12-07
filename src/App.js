import { useEffect, useState } from 'react';
import axios from 'axios'

import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import Landing from './components/Landing/Landing'

import UserContext from './context/UserContext';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined,
    full_name: undefined,
    email: undefined,
  })

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token")

    if (token === null) {
      localStorage.setItem("auth-token", "")
    }

    const tokenRes = await axios.post(`${process.env.REACT_APP_API_URL}/account/tokenIsValid`, null, {
      headers: { "x-auth-token": token }
    });
    
    if (tokenRes) {

      setUserData({
        token,
        user: tokenRes.data.user,
        userId: tokenRes.data.user.userId,
        level: tokenRes.data.user.level
      })

      localStorage.setItem("user", userData.userId)
    } else {
      localStorage.setItem("auth-token", "")
    }
  }

  useEffect(() => {
    // checkLoggedIn()
  }, []);

  return (
    <div>
      <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Routes>
          <Route exact path="" element={<Landing />} />
          <Route exact path="home" element={<Profile />} />
          <Route exact path="settings" element={<Settings />} />
          <Route exact path="dashboard" element={<Dashboard />}/>
        </Routes>
      </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
