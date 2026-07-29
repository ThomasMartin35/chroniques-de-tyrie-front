// React
import { useEffect, useState, type ReactNode } from "react";
// Services
import { authService } from "../../services/authService";
import { authSessionService } from "../../services/authSessionService";
import { tokenService } from "../../services/tokenService";
import { userService } from "../../services/userService";
// Types
import type { UserProfileResponse } from "../../types/user";
// Context
import { AuthContext } from "./AuthContextDefinition";

/////////////////////
//     Props       //
/////////////////////

interface AuthProviderProps {
  children: ReactNode;
}

////////////////////
//   Provider     //
////////////////////

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [user, setUser] = useState<UserProfileResponse | null>(null);

  const refreshUser = async (): Promise<void> => {
    const userProfile = await userService.getUserProfile();
    setUser(userProfile);
  };

  const login = async (token: string): Promise<void> => {
    tokenService.setToken(token);

    try {
      await refreshUser();
      setIsAuthenticated(true);
    } catch (error) {
      tokenService.removeToken();
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
    } finally {
      tokenService.removeToken();
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      try {
        const response = await authService.refresh();
        tokenService.setToken(response.token);
        await refreshUser();
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to restore authentication:", error);
        tokenService.removeToken();
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    };

    void initializeAuth();
  }, []);

  useEffect(() => {
    authSessionService.setSessionExpiredHandler(() => {
      tokenService.removeToken();
      setUser(null);
      setIsAuthenticated(false);
    });

    return () => {
      authSessionService.clearSessionExpiredHandler();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAuthLoading,
        user,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
