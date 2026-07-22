export interface UserProfileResponse {
    id: string;
    username: string;
    email: string;
    role: string;
    biography: string | null;
    avatarUrl: string | null;
    isActive: boolean;
    createdAt: string;
}

export interface UpdateProfileRequest {
    username: string;
    biography: string | null;
}

export interface UpdatePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface MessageResponse {
    message: string;
}