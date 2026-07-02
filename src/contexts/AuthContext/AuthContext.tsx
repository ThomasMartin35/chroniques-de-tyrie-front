// React
import { createContext, useContext, useState, type ReactNode } from "react";
// Services
import { tokenService } from "../../services/tokenService";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// TODO: Store authenticated user information.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component to provide authentication context
 * @param param0 - Props containing children components
 * @returns JSX.Element
 */
function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    tokenService.isAuthenticated()
  );

  const login = (token: string) => {
    tokenService.setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    tokenService.removeToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to access the AuthContext
 * @throws Error if used outside of AuthProvider
 * @returns  AuthContextType 
 */
function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };