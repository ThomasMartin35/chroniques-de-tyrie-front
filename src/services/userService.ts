// API Client
import { apiClient } from "../api/apiClient";
// Types
import type { UpdateProfileRequest, UserProfileResponse } from "../types/user";

export const userService = {
  // To get the current user's profile, we can use the endpoint GET /users/me
  async getUserProfile(): Promise<UserProfileResponse> {
    const response = await apiClient.get<UserProfileResponse>("/users/me");
    return response.data;
  },

  // To update the current user's profile, we can use the endpoint PATCH /users/me
  async updateUserProfile(data: UpdateProfileRequest) {
    const payload = {
      ...data,
      biography: data.biography?.trim(),
    };
    const response = await apiClient.patch<UserProfileResponse>(
      "/users/me",
      payload,
    );
    return response.data;
  },
};
