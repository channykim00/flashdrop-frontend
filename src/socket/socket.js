import { io } from "socket.io-client";
import { API_URL } from "@/constants";

const SOCKET_URL = API_URL;

const socket = io(SOCKET_URL, {
  autoConnect: false,
});

export default socket;
