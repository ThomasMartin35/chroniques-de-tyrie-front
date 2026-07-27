// React
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
// Services
import { tokenService } from "../../services/tokenService";
import { userService } from "../../services/userService";
// Types
import type { UserProfileResponse } from "../../types/user";

////////////////////
//     Types      //
////////////////////

interface AuthContextType {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  user: UserProfileResponse | null;
  refreshUser: () => Promise<void>;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

////////////////////
//    Context     //
////////////////////

const AuthContext = createContext<AuthContextType | undefined>(undefined);

////////////////////
//   Component    //
////////////////////

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const [user, setUser] = useState<UserProfileResponse | null>(null);

  /**
   * Refresh the authenticated user's profile
   */
  const refreshUser = async (): Promise<void> => {
    const userProfile = await userService.getUserProfile();
    setUser(userProfile);
  };

  /**
   * Login the user
   */
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

  /**
   * Logout the user
   */
  const logout = () => {
    tokenService.removeToken();
    setIsAuthenticated(false);
    setUser(null);
  };

  /**
   * Restore authentication after page refresh
   */
  useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      if (!tokenService.isAuthenticated()) {
        setIsAuthLoading(false);
        return;
      }

      try {
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

  ////////////////////
  //     Render     //
  ////////////////////

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

////////////////////
//      Hook      //
////////////////////

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
