import "./UserSection.css";
import { Helmet } from "react-helmet";

function UserSection() {
    return (
        <div>
            <Helmet>
                <title>User Portal</title>
            </Helmet>
            <a href = "#">Login</a>
            <br />
            <a href = "/user/register">Register</a>
            <span id = "hidden"></span>
            <span id = "main-navbar"></span>
            <span id = "header-sidebar-toggle"></span>
            <span id = "logo"></span>
        </div>
    )
}

export default UserSection;