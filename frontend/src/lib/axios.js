import axios from "axios";

const isDev = import.meta.env.MODE === "development";
const envBaseUrl = import.meta.env.VITE_API_URL;
const BASE_URL = envBaseUrl || (isDev ? "http://localhost:5001/api" : "/api");

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
});
