import { io } from "socket.io-client";
import { SocketIO, AuthUser } from "./atom";

const endpoint = process.env.REACT_APP_API;
const socket = io(endpoint);


export { SocketIO, socket, AuthUser }