import React, { useState } from 'react'
import axios from "axios"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import "./styles.css"

const Signup = () => {
    const [form, setForm] = useState({ });
    const [dateOfBirth, setDateOfBirth] = useState(null);

    const onDateChange = (date) => {
        const currentDate = new Date();
        const userBirthdate = new Date(date);
        const ageDifference = currentDate.getFullYear() - userBirthdate.getFullYear();
        if(ageDifference >= 21) {
            setDateOfBirth(date)
            setForm({ ...form, date });
            console.log(form)
        } else {
            toast.error('You must be at least 21 years old!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
    }

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        console.log(e.target.name);
        console.log(e.target.value);
        
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            console.log(form)
                await axios.post(`${process.env.REACT_APP_API_URL}/account/user`, form);
                console.log('Account Created!');
            
        }

        catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div>
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <form className="form-background" onSubmit={submit} style={{ height: '360px' }}>
                <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={onChange}
                        placeholder="Enter email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="displayName">Full Name</label>
                    <input
                        type="full_name"
                        className="form-control"
                        name="full_name"
                        onChange={onChange}
                        placeholder="Enter Full Name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={onChange}
                        placeholder="Enter password"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordCheck">Re-Enter Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="passwordCheck"
                        onChange={onChange}
                        placeholder="Enter password again"
                    />
                </div>
                <div className="form-group">
                    <label>Date of Birth:</label>
                    <DatePicker
                        selected={dateOfBirth}
                        onChange={(date) => onDateChange(date)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        placeholderText="Select Date of Birth"
                        dateFormat="MM/dd/yyyy" // Choose your desired date format
                        className="form-control"
                    />
                    </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary submit mt-2">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Signup