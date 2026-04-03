import axios from "axios";
import toast from "react-hot-toast";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const appApi = axios.create({
  baseURL: SERVER_BASE_URL,
  withCredentials: true,
});

appApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let errorMessage = "An unexpected error occurred. Please try again later.";
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    toast.error(errorMessage);
    return Promise.reject(error);
  }
);