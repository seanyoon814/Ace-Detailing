// import axios from 'axios';
// import backend from "../../constants/backend";
// import { logOut } from "./authSlice"; 

// const { apiUrl } = backend;

// const login = async(userData)=>{
//     const response = await axios.post(`${apiUrl}/auth/`, userData);
//     if (response.data){
//         localStorage.setItem('user', JSON.stringify(response.data.user));
//     }
//     return response.data;
// }

// const logout = async(cookie)=>{
//     // const response = await axios.post(`${apiUrl}/auth/logout`, cookie);
//     localStorage.removeItem('user');
// }

// const authService = { 
//     login,
//     logout
// }
// export default authService