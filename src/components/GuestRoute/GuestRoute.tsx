// React
import type { ReactNode } from "react";
// React Router
import { Navigate, useLocation } from "react-router-dom";
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
  const { isAuthenticated, isAuthLoading } = useAuth();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname ?? "/";

  // TODO : Add a loading spinner or skeleton component here to indicate that the authentication status is being checked.
  if (isAuthLoading) {
    return <p>Chargement...</p>;
  }

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}

export default GuestRoute;