// React
import type { ButtonHTMLAttributes, ReactNode } from "react";
// Styles
import "./Button.css";

///////////////////
//     Props     //
///////////////////
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  isOutline?: boolean;
}

///////////////////
//   Component   //
///////////////////
function Button({
  children,
  variant = "primary",
  isOutline = false,
  className = "",
  ...props
}: ButtonProps) {
  const buttonClasses = [
    "button",
    `button--${variant}`,
    isOutline ? "button--outline" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}

export default Button;