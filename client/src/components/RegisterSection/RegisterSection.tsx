import { Helmet } from "react-helmet";
import "./RegisterSection.css";
import { useEffect } from "react";

function RegisterSection() {
   
    return (
        <html>
            <Helmet>
                <title>User Register</title>
            </Helmet>
            <body>
                <header>
                    <a href = "/user">&#8592;User Portal</a>
                </header>
                <form action = "http://localhost:5000/user/register" method = "post">
                    <table><tbody>
                        <tr>
                            <td>Name:</td>
                            <td><input name = "name" type = "text" placeholder = "Name" required/></td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td><input name = "email" type = "email" placeholder = "Email" required/></td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td><input name = "password" type = "password" placeholder = "Password" required/></td>
                        </tr>
                        <tr>
                            <td>Confirm Password:</td>
                            <td><input name = "confirm" type = "password" placeholder = "Confirm Password" required/></td>
                        </tr>
                    </tbody></table>
                    
                    <button>SUBMIT</button>
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