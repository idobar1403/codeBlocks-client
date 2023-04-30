import { io } from "socket.io-client";

const socket = io.connect("https://codeblocksserver.herokuapp.com/",{ transports: ['websocket']});
// const socket = io.connect(window.location.hostname);


export default socket;