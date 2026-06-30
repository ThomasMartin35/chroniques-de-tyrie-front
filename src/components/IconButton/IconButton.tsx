// React components
import type { ReactNode } from "react";
// Styles
import "./IconButton.css";

///////////////////
//     Props     //
///////////////////

interface IconButtonProps {
    children: ReactNode;
    onClick?: () => void;
    ariaLabel: string;
}

///////////////////
//   Component   //
///////////////////

function IconButton({ children, onClick, ariaLabel }: IconButtonProps) {
  return (
    <button
      type="button"
      className="icon-button"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default IconButton;