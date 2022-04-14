import axios from "axios";
import { io } from "socket.io-client";

const baseUrl = process.env.REACT_APP_REST_API_URL;
const apiHeaders = {
    'Content-Type': 'application/json',
}
const socket = io(baseUrl);

const axiosDefault = (token) => {
    axios.defaults.baseURL = baseUrl;
    axios.defaults.credentials = 'include';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} 


export { socket, axiosDefault, baseUrl, apiHeaders }