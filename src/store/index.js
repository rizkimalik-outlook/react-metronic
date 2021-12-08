import { io } from "socket.io-client";
import { SocketStore, AuthUser } from "./atom";

const endpoint = process.env.REACT_APP_REST_API;
const socket = io(endpoint);


export { socket, SocketStore, AuthUser }