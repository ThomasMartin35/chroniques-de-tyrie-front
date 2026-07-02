// Axios instance for API requests
import axios from "axios";
// Services
import { tokenService } from "../services/tokenService";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Add a request interceptor to include the token in the Authorization header
api.interceptors.request.use((config) => {
  const token = tokenService.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const apiClient = api;