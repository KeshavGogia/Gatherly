import axios from "axios";


const isDev = import.meta.env.MODE === "development";
const envBaseUrl = import.meta.env.VITE_API_URL;
const BASE_URL = isDev
  ? (envBaseUrl || "http://localhost:5001/api")
  : (envBaseUrl || "/api");

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
});
