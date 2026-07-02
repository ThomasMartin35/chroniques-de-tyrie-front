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
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/connexion" replace />;
  }

  return children;
}

export default ProtectedRoute;
