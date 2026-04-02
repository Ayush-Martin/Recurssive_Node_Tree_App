import axios from "axios";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const appApi = axios.create({
  baseURL: SERVER_BASE_URL,
  withCredentials: true,
});