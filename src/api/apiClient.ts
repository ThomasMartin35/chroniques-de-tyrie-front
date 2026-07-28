// Axios
import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
// Services
import { authSessionService } from "../services/authSessionService";
import { tokenService } from "../services/tokenService";
// Types
import type { LoginResponse } from "../types/auth";

const API_BASE_URL = "http://localhost:8080/api";

/**
 * The authApiClient is an Axios instance configured for authentication-related API requests. 
 * It has a base URL set to the API_BASE_URL and is configured to include credentials (like cookies) in cross-site requests. 
 * This client is used for endpoints that handle user authentication, such as login, registration, and token refresh.
 */
const authApiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

/**
 * The apiClient is an Axios instance configured for general API requests.
 * It has a base URL set to the API_BASE_URL and is configured to include credentials (like cookies) in cross-site requests.
 * This client is used for endpoints that require authentication and may need to handle token refresh logic.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

let refreshPromise: Promise<string> | null = null;

/**
 * Refreshes the access token while preventing concurrent refresh requests.
 */
const refreshAccessToken = async (): Promise<string> => {
  if (!refreshPromise) {
    refreshPromise = authApiClient
      .post<LoginResponse>("/auth/refresh")
      .then((response) => {
        const newToken = response.data.token;

        tokenService.setToken(newToken);

        return newToken;
      })
      .catch((error: unknown) => {
        tokenService.removeToken();
        authSessionService.notifySessionExpired();

        throw error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

api.interceptors.request.use((config) => {
  const token = tokenService.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest =
      error.config as RetryableRequestConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const newToken = await refreshAccessToken();

      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);

export const apiClient = api;
export { authApiClient };