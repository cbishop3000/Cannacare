import React from 'react'
import './Settings.css'

import Navbar from '../Navbar/Navbar'

const Settings = () => {
    // const { userData, setUserData } = useContext(UserContext)

    // console.log(userData)

  return (
    <div className='parent-contrainer'>
        <div className="container mt-3">
            <div className="row gutters">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="account-settings">
                                <div className="user-profile">
                                    <div className="user-avatar">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Maxwell Admin" />
                                    </div>
                                    <h5 className="user-name">full name</h5>
                                    <h6 className="user-email">email</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="row gutters">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 className="mb-3 text-primary">Personal Details</h6>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label for="fullName">Full Name</label>
                                        <input type="text" className="form-control" id="fullName" placeholder="email" />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label for="eMail">Email</label>
                                        <input type="email" className="form-control" id="eMail" placeholder="email" />
                                    </div>
                                </div>
                            </div>
                            <div className="row gutters mt-5">
                                <div className="">
                                    <button type="button" id="submit" name="submit" className="btn btn-secondary">Cancel</button>
                                    <button type="button" id="submit" name="submit" className="btn btn-primary mr-5">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    </div>
    
  )
}

export default Settings