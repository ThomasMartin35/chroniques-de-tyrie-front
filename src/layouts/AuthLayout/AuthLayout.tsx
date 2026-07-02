// React
import { type ReactNode } from "react";
// Styles
import "./AuthLayout.css";

///////////////////
//     Props     //
///////////////////
interface AuthLayoutProps {
  children: ReactNode;
}

///////////////////
//   Component   //
///////////////////
function AuthLayout({ children }: AuthLayoutProps) {
  return <main className="auth-layout">{children}</main>;
}

export default AuthLayout;
