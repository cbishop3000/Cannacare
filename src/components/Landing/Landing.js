import React, { useEffect, useContext } from 'react'
import "./Landing.css"
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';

import axios from 'axios'
import UserContext from '../../context/UserContext';

import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const { userData, setUserData } = useContext(UserContext)
  const userId = localStorage.getItem("userId")
  const navigate = useNavigate();

  const checkLoggedIn = async () => {
    let token
    // let token = localStorage.getItem("auth-token")

    // if (token === null) {
    //   localStorage.setItem("auth-token", "")
    // }

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
  if(userId) {
    navigate("/home")
  }
}, [])

  return (
    <div>
        <div className='signup-buttons'>
            <Popup trigger={<button className='btn btn-primary m-0'>Signup</button>} modal="true">
              <Signup />
            </Popup>
            <Popup trigger={<button className='btn btn-primary m-0'>Login</button>} modal="true">
              <Login />
            </Popup>
        </div>
    </div>
  )
}

export default Landing