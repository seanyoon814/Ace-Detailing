import { Helmet } from "react-helmet";
import "./RegisterSection.css";
import backend from "../../constants/backend";

const { apiUrl } = backend;

function RegisterSection() {
   
    return (
        <html className = "RegisterSection">
            <Helmet>
                <title>User Register</title>
            </Helmet>
            <body className = "RegisterSection">
                <header className = "RegisterSection">
                    <a href = "/portal" className = "RegisterSection">&#8592; Portal</a>
                </header>
                <h1 className = "RegisterSection">User Regsiter</h1>

                <form action={`${apiUrl}/user/register`} method = "post" className = "RegisterSection">
                    <table className = "RegisterSection"><tbody>
                        <tr>
                            <td className = "RegisterSection">Name:</td>
                            <td className = "RegisterSection"><input name = "name" onChange = {checkName} type = "text" placeholder = "Name"  className = "RegisterSection"required/></td>
                        </tr>
                        <tr>
                            <td className = "RegisterSection">Email:</td>
                            <td className = "RegisterSection"><input name = "email" onChange = {checkEmail} type = "email" placeholder = "Email"  className = "RegisterSection"required/></td>
                        </tr>
                        <tr>
                            <td className = "RegisterSection">Password:</td>
                            <td className = "RegisterSection"><input name = "password" type = "password" placeholder = "Password"  className = "RegisterSection"required/></td>
                        </tr>
                        <tr>
                            <td className = "RegisterSection">Confirm Password:</td>
                            <td className = "RegisterSection"><input name = "confirm" type = "password" placeholder = "Confirm Password"  className = "RegisterSection"required/></td>
                        </tr>
                    </tbody></table>
                    
                    <button className = "RegisterSection">SUBMIT</button>
                </form>

                <RegisterSectionScript />

            </body>
            
        </html>
    )

}

function RegisterSectionScript() {
    console.log("loaded");

    //TODO: check if user is admin

    setTimeout(() => {
        var password = document.getElementsByName("password")[0] as HTMLInputElement;
        var confirm = document.getElementsByName("confirm")[0] as HTMLInputElement;
        password.addEventListener("input", validate);
        confirm.addEventListener("input", validate);


        function validate() {
            if (password.value != confirm.value) {
                confirm.setCustomValidity("Doesn't Match");
            }
            else {
                confirm.setCustomValidity("");
            }
        }
    })
    

    return "";
}

function checkName() {
    const input = document.getElementsByName("name")[0] as HTMLInputElement;
    fetch(`${apiUrl}/user/api/checkName/${input.value}`)
        .then(response => response.json())
        .then(data => {
            const { taken } = data;
            input.setCustomValidity(taken ? "This name has been used." : "");
        });
}

function checkEmail() {
    const input = document.getElementsByName("email")[0] as HTMLInputElement;
    fetch(`${apiUrl}/user/api/checkEmail/${input.value}`)
        .then(response => response.json())
        .then(data => {
            const { taken } = data;
            console.log(taken);
            input.setCustomValidity(taken ? "This email address has been used." : "");
        });
}

export default RegisterSection;