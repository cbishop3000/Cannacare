import React, { useState, useContext } from 'react'
import axios from "axios"
import UserContext from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const { setUserData } = useContext(UserContext)
    const [form, setForm] = useState({});

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submit = async (e) => {
        e.preventDefault();

        try {
            const loginRes = await axios.post(`${process.env.REACT_APP_API_URL}/account/login`, {
                email: form.email,
                password: form.password
            });

            if (loginRes) {
                setUserData({
                    token: loginRes.data.token,
                    user: loginRes.data.user,
                    userId: loginRes.data.user.userId
                })

                navigate('/home')
                localStorage.setItem('auth-token', loginRes.data.token)
                localStorage.setItem('userId', loginRes.data.user.userId)
            } else {
                console.log('Could not Login!')
            }


        } catch (err) {
            console.log("Invalid Credentials");
        }
    };

    return (
        <div>
            <form className="form-background" onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={onChange}
                        placeholder="Enter email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        className="form-control"
                        name="password"
                        onChange={onChange}
                        placeholder="Enter password"
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary submit mt-2">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login