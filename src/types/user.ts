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