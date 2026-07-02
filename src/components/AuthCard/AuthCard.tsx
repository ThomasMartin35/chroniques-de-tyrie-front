// React
import { type ReactNode } from "react";
// Styles
import "./AuthCard.css";
// Assets
import logo from "../../assets/logos/logo_cdt.png";

///////////////////
//     Props     //
///////////////////
interface AuthCardProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

///////////////////
//   Component   //
///////////////////
function AuthCard({ title, children, footer }: AuthCardProps) {
  return (
    <section className="auth-card d-flex flex-column gap-4">
      <img
        src={logo}
        alt="Logo Chroniques de Tyrie"
        className="auth-card__logo"
      />
      <h1 className="auth-card__title text-center">{title}</h1>
      <div className="auth-card__content d-flex flex-column gap-3 ">
        {children}
      </div>
      {footer && (
        <div className="auth-card__footer d-flex flex-column gap-2 align-items-center">
          {footer}
        </div>
      )}
    </section>
  );
}

export default AuthCard;
