import httpClient from "../httpClient";
import backend from "../../constants/backend";

const { apiUrl, clientUrl } = backend;

export default async function checkAdmin(isAdmin, notAdmin) {
    
    const result = await httpClient.get(`${apiUrl}/user/api/check`);
    result.data ? isAdmin() : notAdmin();
    return result.data;

}