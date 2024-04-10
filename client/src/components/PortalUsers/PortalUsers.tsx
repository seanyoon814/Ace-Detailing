import "./PortalUsers.css";
import backend from "../../constants/backend";
import httpClient from "../../features/httpClient";
import { selectCurrentToken,  } from "../../features/auth/authSlice";
import { useSendLogoutMutation, useCheckTokenMutation } from "../../features/auth/authApiSlice"; 
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import {store} from "../../store";
const { apiUrl, clientUrl } = backend;
var changedName = false;
var changedEmail = false;
// Note just updated the code for error handling of post and get requests
// Would have been better to use a form to handle user creation.. but it works
function PortalUsers() {
    const navigate = useNavigate();
    const [sendLogout] = useSendLogoutMutation();
    const maxRetryAttempts = 1;
    const [sendCheckToken] = useCheckTokenMutation();
    const token = useSelector(selectCurrentToken);

    async function authCheckBeforeRequest(path:string , token: string, retries: number, input: HTMLInputElement){
        try {
            await sendCheckToken(token);
            const result = await axios.get(`${apiUrl}/${path}`, {headers:{Authorization: `Bearer ${token}`}});
            if(path.includes("checkName")){
                const { taken } = result.data;
                input.setCustomValidity(taken ? "This name has been used." : "");
                changedName = false;
            }else {
                const { taken } = result.data;
                input.setCustomValidity(taken ? "This email address has been used." : "");
                changedEmail = false;
            }
            
        }
        catch (error) {
            if (error.response && error.response.status !== 204 && retries < maxRetryAttempts){
                const newToken = selectCurrentToken(store.getState());
                authCheckBeforeRequest(path, newToken, retries + 1, input);
            } else {
                toast.error("Login Expired. Redirecting to login page...")
                sendLogout();
                navigate('/user');
            }
        }
    }
    async function authCheckBeforePost(token: string, retries: number){
        try{
            await sendCheckToken(token);
            const res = await axios.post(`${apiUrl}/user/register`, {
                name : getInput("name").value,
                email : getInput("email").value,
                password : getInput("password").value
            }, {headers:{Authorization: `Bearer ${token}`}})

            if (res.status === 204) {
                alert(`Created user: ${getInput("name").value}.`);
                getInput("name").value = "";
                getInput("email").value = "";
                getInput("password").value = "";
                getInput("confirm").value = "";
            }
            toast.success("User added successfully.");
        } catch (error){
            if(error.response && error.response.status === 403 && retries < maxRetryAttempts){
                const newToken = selectCurrentToken(store.getState());
                authCheckBeforePost(newToken, retries+1);
            } else {
                console.log("Error:", error);
                toast.error("Login Expired. Redirecting to login page...")
                sendLogout();
                navigate('/user');
            }
        }
    }

    //Request
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
    
        // const result = await httpClient.get(`${apiUrl}/user/api/checkName/${input.value}`);
        authCheckBeforeRequest(`user/api/checkName/${input.value}`, token, 0, input);
        // const { taken } = result.data;
        // input.setCustomValidity(taken ? "This name has been used." : "");
        // changedName = false;
    }

    // Request
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
    
        // const result = await httpClient.get(`${apiUrl}/user/api/checkEmail/${input.value}`);
        authCheckBeforeRequest(`user/api/checkEmail/${input.value}`, token, 0, input);
        // const { taken } = result.data;
        // input.setCustomValidity(taken ? "This email address has been used." : "");
        // changedEmail = false;
    }
    
    // Post
    async function submit(event: any) {
        event.preventDefault();
        if (changedName || changedEmail) return;
        authCheckBeforePost(token, 0);
        // const result = await httpClient.post(`${apiUrl}/user/register`, {
        //     name : getInput("name").value,
        //     email : getInput("email").value,
        //     password : getInput("password").value
        // })
    
        // if (result.status === 204) {
        //     alert(`Created user: ${getInput("name").value}.`);
        //     getInput("name").value = "";
        //     getInput("email").value = "";
        //     getInput("password").value = "";
        //     getInput("confirm").value = "";
        // }
    }
    
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
    setTimeout(() => {
        var password = document.getElementsByName("password")[0] as HTMLInputElement;
        var confirm = document.getElementsByName("confirm")[0] as HTMLInputElement;
        if (!password || !confirm) return;
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

// async function checkName() {
//     const input = document.getElementsByName("name")[0] as HTMLInputElement;
//     if (input.value == "") return;
    
//     changedName = true;
//     // fetch(`${apiUrl}/user/api/checkName/${input.value}`, {
//     //     method : "get",
//     //     credentials : "include",
//     //     headers : { Authorization : `Bearer ${selectCurrentToken(store.getState())}` }
//     // })
//     //     .then(response => response.json())
//     //     .then(data => {
//     //         const { taken } = data;
//     //         input.setCustomValidity(taken ? "This name has been used." : "");
//     //     });

//     const result = await httpClient.get(`${apiUrl}/user/api/checkName/${input.value}`);
//     const { taken } = result.data;
//     input.setCustomValidity(taken ? "This name has been used." : "");
//     changedName = false;
// }

// async function checkEmail() {

//     const input = document.getElementsByName("email")[0] as HTMLInputElement;
//     if (input.value == "") return;

//     changedEmail = true;
//     // fetch(`${apiUrl}/user/api/checkEmail/${input.value}`)
//     //     .then(response => response.json())
//     //     .then(data => {
//     //         const { taken } = data;
//     //         input.setCustomValidity(taken ? "This email address has been used." : "");
//     //     });

//     const result = await httpClient.get(`${apiUrl}/user/api/checkEmail/${input.value}`);
//     const { taken } = result.data;
//     input.setCustomValidity(taken ? "This email address has been used." : "");
//     changedEmail = false;
// }

// async function submit(event: any) {
//     event.preventDefault();
//     if (changedName || changedEmail) return;
//     // fetch(`${apiUrl}/user/register`, {
//     //     method : "post",
//     //     headers : { "Content-Type" : "application/json" },
//     //     body : JSON.stringify({
//     //         name : getInput("name").value,
//     //         email : getInput("email").value,
//     //         password : getInput("password").value
//     //     })
//     // })
//     //     .then(response => {
//     //         if (response.status === 204) {
//     //             alert(`Created user: ${getInput("name").value}.`);
//     //             getInput("name").value = "";
//     //             getInput("email").value = "";
//     //             getInput("password").value = "";
//     //             getInput("confirm").value = "";
//     //         }
//     //     })


//     const result = await httpClient.post(`${apiUrl}/user/register`, {
//         name : getInput("name").value,
//         email : getInput("email").value,
//         password : getInput("password").value
//     })

//     if (result.status === 204) {
//         alert(`Created user: ${getInput("name").value}.`);
//         getInput("name").value = "";
//         getInput("email").value = "";
//         getInput("password").value = "";
//         getInput("confirm").value = "";
//     }
// }

function getInput(name: string) {
    return (document.getElementsByName(name)[0] as HTMLInputElement);
}

export default PortalUsers;