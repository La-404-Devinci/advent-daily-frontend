import React, { createContext, useContext, useRef, useEffect } from "react";
import socket from "./web-socket.js";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const socketRef = useRef(null);

    if (!socketRef.current) {
        socketRef.current = socket;
        socketRef.current.connect();
        console.log(socketRef.current);
    }

    useEffect(() => {
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={socketRef.current}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
