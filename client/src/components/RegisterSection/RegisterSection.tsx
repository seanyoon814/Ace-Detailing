import "./RegisterSection.css";

function RegisterSection() {
    return (
        <form action = "http://localhost:5000/user/register" method = "post">
            <input name = "name" />
            <input name = "email" />
            <input name = "password" />
            <button>SUBMIT</button>
        </form>
    )
}

export default RegisterSection();