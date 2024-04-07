import {selectCurrentToken } from "./auth/authSlice";
import axios from "axios";
import backend from "../constants/backend"
import {store} from "../store";
import {toast} from "react-toastify";
const url = backend.apiUrl;

function getClient() {
    const token = selectCurrentToken(store.getState())
    
    // console.log(token)
    return axios.create({
        baseURL: url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });
}


// GET method
async function get(path) {
    return getClient().get(path)
}

// POST method, body = data
async function post(path, body) {
    return getClient().post(path, body)
}

// PATCH method, body = data
async function patch(path, body) {
    return getClient().patch(path, body)
}

// DELETE method
async function deleteRequest(path) {
    return getClient().delete(path)
}

const httpClient = {
    getClient,
    get,
    post,
    patch,
    deleteRequest
} ;
export default httpClient;