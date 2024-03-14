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
        </div>
    )
}

export default UserSection();