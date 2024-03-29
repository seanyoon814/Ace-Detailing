import { useState } from "react";
import {Navigate, useNavigate} from 'react-router-dom';
import "./UserSection.css";
import { Helmet } from "react-helmet";
import Header from '../Header/Header';
import axios from 'axios'
import backend from "../../constants/backend";

function UserSection() {
    const { apiUrl } = backend;
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({email:'', password:''});
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Perform login logic here using formData
        axios.post(apiUrl+'/auth', inputs).then(res=>{     
            navigate('/portal');
        }).catch(err=>{
            console.log(err);
            window.alert('Error logging in. Invalid credentials. Please try again.');
        });
        setInputs({email:'', password:''});
        console.log('Login data:', inputs);
      };

    return (
        <div className="login-background">
            <Header/>
            <Helmet>
                <title>User Portal</title>
            </Helmet>
            <div id="login-container">
                <div id="login-content">
                    <div id="login">
                        <h1>User Portal</h1>
                        <p>Please use the login details from the administrator to enter the user portal.</p>
                        <form onSubmit={handleSubmit}>
                            <label>Email: <br></br>
                                <input className="input-group-text"
                                    type="email"
                                    name="email"
                                    value={inputs.email || "" } 
                                    onChange={handleChange}/>
                            </label>
                            <br></br>
                            <label>Password: <br></br>
                                <input className="input-group-text"
                                type="password"
                                name="password" 
                                value={inputs.password || ""}
                                onChange={handleChange}/>
                            </label>
                            <br></br>
                            <button type="submit" className="btn btn-primary">Login</button>
                            <a href="/user/forgot_password" className="btn btn-link">Forgot password?</a>
                        </form>

                    </div> 
                    <div className="login-img">
                    </div>
                </div>
                
                <br />
                {/* admin view - should only be able to see registration if admin */}
                {/* <div id="admin">
                    <a href = "/user/register">Register</a>
                </div> */}

            </div>
            <span id = "hidden"></span>
            <span id = "main-navbar"></span>
            <span id = "header-sidebar-toggle"></span>
            <span id = "logo"></span>
        </div>
    )
}

export default UserSection;