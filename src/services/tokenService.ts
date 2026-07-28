let accessToken: string | null = null;

export const tokenService = {
  getToken: (): string | null => {
    return accessToken;
  },

  setToken: (token: string): void => {
    accessToken = token;
  },

  removeToken: (): void => {
    accessToken = null;
  },

  isAuthenticated: (): boolean => {
    return accessToken !== null;
  },
};