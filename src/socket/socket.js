import { io } from "socket.io-client";

const socket = io.connect("https://codeblocksserver.herokuapp.com/",{ transports: ['websocket']});


export default socket;