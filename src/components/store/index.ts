import axios from "axios";
import { URL_SERVER_API } from "../URLS";

const $api = axios.create({
    withCredentials: true,
    baseURL: `${URL_SERVER_API}`
})

$api.interceptors.request.use((config => {
    const token = localStorage.getItem("accessToken")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}))

export default $api