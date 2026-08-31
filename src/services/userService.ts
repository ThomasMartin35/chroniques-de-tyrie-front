// API Client
import { apiClient } from "../api/apiClient";
// Types
import type {
  AvatarResponse,
  MessageResponse,
  UpdatePasswordRequest,
  UpdateProfileRequest,
  UserProfileResponse,
} from "../types/user";

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

  // To update the current user's password, we can use the endpoint PATCH /users/me/password
  async updateUserPassword(data: UpdatePasswordRequest) {
    const response = await apiClient.patch<MessageResponse>(
      "/users/me/password",
      data,
    );
    return response.data;
  },

  // To upload the current user's avatar, we can use the endpoint PUT /users/me/avatar
  async uploadAvatar(file: File): Promise<AvatarResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.put<AvatarResponse>(
      "/users/me/avatar",
      formData,
    );

    return response.data;
  },

  // To delete the current user's avatar, we can use the endpoint DELETE /users/me/avatar
  async deleteAvatar(): Promise<void> {
    await apiClient.delete("/users/me/avatar");
  },
};
