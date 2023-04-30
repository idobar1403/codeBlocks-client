import { io } from "socket.io-client";

const socket = io("ws://localhost:8000",{ transports: ['websocket', 'polling', 'flashsocket'] });



export default socket;