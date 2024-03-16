import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./UserSection.css";
import { Helmet } from "react-helmet";
import Header from '../Header/Header';

function UserSection() {
    const [inputs, setInputs] = useState({email:'', password:''});
    // const [email, setEmail] = useState("");
    // const [pw, setPw] = useState("");

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Perform login logic here using formData
        setInputs({email:'', password:''});
        console.log('Login data:', inputs);
      };

    return (
        <div className="login-background">
            <Helmet>
                <title>User Portal</title>
            </Helmet>
                <div id="login-heading" className="jumbotron justify-content-center align-items-center">
                    <div className="display-5">
                        <h1>User Portal</h1>
                        <p className="lead">
                            Please contact the administrator for access to the user portal.
                        </p>
                        <hr className="my-2"/>
                            FAQ Section Contact Goes Here 
                    </div>
                </div>
            <div id="login-container">

                <div id="login-content">
                    <div id="login">
                        <form onSubmit={handleSubmit}>
                            <label>Email:
                                <input 
                                    type="email"
                                    name="email"
                                    value={inputs.email || "" } 
                                    onChange={handleChange}/>
                            </label>
                            <label>Password
                                <input 
                                type="password"
                                name="password" 
                                value={inputs.password || ""}
                                onChange={handleChange}/>
                            </label>
                            <button type="submit">Login</button>
                        </form>
                    </div> 
                </div>
                <div id="login-img">
                    Test
                </div>
                
                <br />
                {/* admin view - should only be able to see registration if admin */}
                <div id="admin">
                    <a href = "/user/register">Register</a>
                </div>

            </div>
            <span id = "hidden"></span>
            <span id = "main-navbar"></span>
            <span id = "header-sidebar-toggle"></span>
            <span id = "logo"></span>
        </div>
    )
}

export default UserSection;