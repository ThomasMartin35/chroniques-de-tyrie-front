// React
import type { ReactNode } from "react";
// React Router
import { Navigate } from "react-router-dom";
// Context
import { useAuth } from "../../contexts/AuthContext";

///////////////////
//     Props     //
///////////////////

interface GuestRouteProps {
  children: ReactNode;
}

///////////////////
//   Component   //
///////////////////

function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/profil" replace />;
  }

  return <>{children}</>;
}

export default GuestRoute;
