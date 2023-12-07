import React, { useState } from 'react'
import axios from "axios"
// import "./styles.css"

const Signup = () => {
    const [form, setForm] = useState({ });

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
            <form className="form-background" onSubmit={submit} style={{ height: '300px' }}>
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
                        type="text"
                        className="form-control"
                        name="password"
                        onChange={onChange}
                        placeholder="Enter password"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordCheck">Re-Enter Password</label>
                    <input
                        type="text"
                        className="form-control"
                        name="passwordCheck"
                        onChange={onChange}
                        placeholder="Enter password again"
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

export default Signup