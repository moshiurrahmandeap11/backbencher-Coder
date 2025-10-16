// src/hooks/axiosInstance.ts
import axios from "axios";
import type { AxiosInstance } from "axios";

// Base URL jeikhane API ase
const BASE_URL = "http://localhost:3000/bb/v1";
// https://backbencher-server.onrender.com/bb/v1

// Create Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
