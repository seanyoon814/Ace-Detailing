import React from "react";
import "./PortalUsers.css";
import backend from "../../constants/backend";

const { apiUrl } = backend;

function PortalUsers() {
   
    return (
        <div id = "PortalUsers">

            <form action = {`${apiUrl}/user/register`} method = "post">
                <table><tbody>
                    <tr>
                        <td>Name:</td>
                        <td><input name = "name" onChange = {checkName} type = "text" placeholder = "Name" required/></td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td><input name = "email" onChange = {checkEmail} type = "email" placeholder = "Email" required/></td>
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

            <PortalUsersScript />

        </div>
            
    )

}

function PortalUsersScript() {
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

export default PortalUsers;