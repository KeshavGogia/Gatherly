import { io } from "socket.io-client";

// Prefer explicit env var in production; default to same-origin.
// In development, default to local backend unless VITE_SOCKET_URL is provided.
const isDev = import.meta.env.MODE === "development";
const envSocketUrl = import.meta.env.VITE_SOCKET_URL;
const SOCKET_URL = isDev
  ? (envSocketUrl || "http://localhost:5001")
  : (envSocketUrl || window.location.origin);

let socket = null;

export const initializeSocket = () => {
  console.log("Initializing socket connection to:", SOCKET_URL);
  if (!socket) {
    socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  }
  return socket;
};

export const getSocket = () => {
  console.log("Getting socket instance");
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket");
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export default {
  initializeSocket,
  getSocket,
  disconnectSocket,
};