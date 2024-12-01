import { io } from "socket.io-client";

const socket = io('https://api-cova-dev.404devinci.fr', {
    transports: ['websocket'],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});


export default socket;