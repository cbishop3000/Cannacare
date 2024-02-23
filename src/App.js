import { useEffect, useState } from 'react';

import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import Landing from './components/Landing/Landing'

import UserContext from './context/UserContext';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar/Navbar'
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined,
    full_name: undefined,
    email: undefined,
  })

  useEffect(() => {
    // checkLoggedIn()
    console.log(userData)
  }, []);

  return (
    <div>
      <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Navbar />
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
