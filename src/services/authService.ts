// API Client
import { authApiClient } from "../api/apiClient";
// Types
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types/auth";

// AuthService with login, register, refresh, and logout methods
export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await authApiClient.post<LoginResponse>(
      "/auth/login",
      data,
    );
    return response.data;
  },

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await authApiClient.post<RegisterResponse>(
      "/auth/register",
      data,
    );
    return response.data;
  },

  async refresh(): Promise<LoginResponse> {
    const response = await authApiClient.post<LoginResponse>("/auth/refresh");
    return response.data;
  },

  async logout(): Promise<void> {
    await authApiClient.post("/auth/logout");
  },
};
