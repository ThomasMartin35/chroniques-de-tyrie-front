import { apiClient } from "../api/apiClient";

// Request interface for the login API
interface LoginRequest {
  email: string;
  password: string;
}

// Response interface for the login API
interface LoginResponse {
  token: string;
  tokenType: string;
}

// AuthService with login method
export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/auth/login", data);
    return response.data;
  },
};