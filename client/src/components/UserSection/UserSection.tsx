import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./UserSection.css";
import { Helmet } from "react-helmet";

function UserSection() {
    return (
        <div className = "UserSection">
            <Helmet>
                <title>User Portal</title>
            </Helmet>
            <a href = "#" className = "UserSection">Login</a>
            <br />
            <a href = "/user/register" className = "UserSection">Register</a>
            <span id = "hidden"></span>
            <span id = "main-navbar"></span>
            <span id = "header-sidebar-toggle"></span>
            <span id = "logo"></span>
        </div>
    )
}

export default UserSection;