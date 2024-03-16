import { Helmet } from "react-helmet";
import "./RegisterSection.css";
import { useEffect } from "react";

function RegisterSection() {
   
    return (
        <html className = "RegisterSection">
            <Helmet>
                <title>User Register</title>
            </Helmet>
            <body className = "RegisterSection">
                <header className = "RegisterSection">
                    <a href = "/user" className = "RegisterSection">&#8592;User Portal</a>
                </header>
                <form action = "http://localhost:5000/user/register" method = "post" className = "RegisterSection">
                    <table className = "RegisterSection"><tbody>
                        <tr>
                            <td>Name:</td>
                            <td><input name = "name" type = "text" placeholder = "Name"  className = "RegisterSection"required/></td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td><input name = "email" type = "email" placeholder = "Email"  className = "RegisterSection"required/></td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td><input name = "password" type = "password" placeholder = "Password"  className = "RegisterSection"required/></td>
                        </tr>
                        <tr>
                            <td>Confirm Password:</td>
                            <td><input name = "confirm" type = "password" placeholder = "Confirm Password"  className = "RegisterSection"required/></td>
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

export default RegisterSection;