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
  const [isAuthenticated, setIsAuthenticated] = useState(
    tokenService.isAuthenticated(),
  );

  const [user, setUser] = useState<UserProfileResponse | null>(null);

  /**
   * Refresh the authenticated user's profile
   */
  const refreshUser = async () => {
    try {
      const userProfile = await userService.getUserProfile();
      setUser(userProfile);
    } catch (error) {
      console.error("Failed to refresh user profile:", error);
      setUser(null);
    }
  };

  /**
   * Login the user
   */
  const login = async (token: string) => {
    tokenService.setToken(token);
    setIsAuthenticated(true);
    await refreshUser();
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
    const initializeAuth = async () => {
      if (!tokenService.isAuthenticated()) {
        return;
      }
      setIsAuthenticated(true);
      try {
        await refreshUser();
      } catch {
        logout();
      }
    };
    initializeAuth();
  }, []);

  ////////////////////
  //     Render     //
  ////////////////////

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
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