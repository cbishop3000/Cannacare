import React from 'react'
import "./Landing.css"
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';

import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import Navbar from '../Navbar/Navbar'

const Landing = () => {
  return (
    <div>
      <Navbar />
        <div className='signup-buttons'>
            <Popup trigger={<button className='btn btn-primary m-0'>Signup</button>}>
              <Signup />
            </Popup>
            <Popup trigger={<button className='btn btn-primary m-0'>Login</button>}>
              <Login />
            </Popup>
        </div>
    </div>
  )
}

export default Landing