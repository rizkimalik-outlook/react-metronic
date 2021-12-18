import { io } from "socket.io-client";

const baseUrl = process.env.REACT_APP_REST_API_URL;
const apiHeaders = {
    'Content-Type': 'application/json',
}
const socket = io(baseUrl);

export { socket,baseUrl, apiHeaders }