// React
import { createContext } from "react";
// Types
import type { UserProfileResponse } from "../../types/user";

/////////////////////
//     Types      //
////////////////////

interface AuthContextType {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  user: UserProfileResponse | null;
  refreshUser: () => Promise<void>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };
