import "./PortalUsers.css";
import backend from "../../constants/backend";
import httpClient from "../../features/httpClient";

const { apiUrl, clientUrl } = backend;
var changedName = false;
var changedEmail = false;

function PortalUsers() {

    return (
        <div id = "PortalUsers">

            <form onSubmit = {submit}>
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

    setTimeout(() => {
        var password = document.getElementsByName("password")[0] as HTMLInputElement;
        var confirm = document.getElementsByName("confirm")[0] as HTMLInputElement;
        password.addEventListener("input", validate);
        confirm.addEventListener("input", validate);


        function validate() {
            if (password.value !== confirm.value) {
                confirm.setCustomValidity("Doesn't Match");
            }
            else {
                confirm.setCustomValidity("");
            }
        }
    })
    

    return "";
}

async function checkName() {
    const input = document.getElementsByName("name")[0] as HTMLInputElement;
    if (input.value == "") return;
    
    changedName = true;
    // fetch(`${apiUrl}/user/api/checkName/${input.value}`, {
    //     method : "get",
    //     credentials : "include",
    //     headers : { Authorization : `Bearer ${selectCurrentToken(store.getState())}` }
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         const { taken } = data;
    //         input.setCustomValidity(taken ? "This name has been used." : "");
    //     });

    const result = await httpClient.get(`${apiUrl}/user/api/checkName/${input.value}`);
    const { taken } = result.data;
    input.setCustomValidity(taken ? "This name has been used." : "");
    changedName = false;
}

async function checkEmail() {

    const input = document.getElementsByName("email")[0] as HTMLInputElement;
    if (input.value == "") return;

    changedEmail = true;
    // fetch(`${apiUrl}/user/api/checkEmail/${input.value}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         const { taken } = data;
    //         input.setCustomValidity(taken ? "This email address has been used." : "");
    //     });

    const result = await httpClient.get(`${apiUrl}/user/api/checkEmail/${input.value}`);
    const { taken } = result.data;
    input.setCustomValidity(taken ? "This email address has been used." : "");
    changedEmail = false;
}

async function submit(event: any) {
    event.preventDefault();
    if (changedName || changedEmail) return;
    // fetch(`${apiUrl}/user/register`, {
    //     method : "post",
    //     headers : { "Content-Type" : "application/json" },
    //     body : JSON.stringify({
    //         name : getInput("name").value,
    //         email : getInput("email").value,
    //         password : getInput("password").value
    //     })
    // })
    //     .then(response => {
    //         if (response.status === 204) {
    //             alert(`Created user: ${getInput("name").value}.`);
    //             getInput("name").value = "";
    //             getInput("email").value = "";
    //             getInput("password").value = "";
    //             getInput("confirm").value = "";
    //         }
    //     })

    const result = await httpClient.post(`${apiUrl}/user/register`, {
        name : getInput("name").value,
        email : getInput("email").value,
        password : getInput("password").value
    })

    if (result.status === 204) {
        alert(`Created user: ${getInput("name").value}.`);
        getInput("name").value = "";
        getInput("email").value = "";
        getInput("password").value = "";
        getInput("confirm").value = "";
    }
}

function getInput(name: string) {
    return (document.getElementsByName(name)[0] as HTMLInputElement);
}

export default PortalUsers;