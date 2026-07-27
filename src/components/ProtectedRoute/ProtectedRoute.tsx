// React
import type { ReactNode } from "react";
// Context
import { useAuth } from "../../contexts/AuthContext";
// React Router
import { Navigate } from "react-router-dom";

////////////////////
//      Props     //
////////////////////
interface ProtectedRouteProps {
  children: ReactNode;
}

////////////////////
//   Component    //
////////////////////
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isAuthLoading } = useAuth();
  if (isAuthLoading) {
    // TODO : Add a loading spinner or skeleton component here to indicate that the authentication status is being checked.
    return null;
  }
  if (!isAuthenticated) {
    return <Navigate to="/connexion" replace />;
  }

  return children;
}

export default ProtectedRoute;
