import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

export type ButtonVariant = "primary" | "outline" | "ghost" | "action-add" | "action-delete" | "toggle";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children?: ReactNode;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, isLoading, disabled, ...props }, ref) => {
    
    let baseClass = "";
    
    switch (variant) {
      case "primary":
        baseClass = "add-root-btn";
        break;
      case "outline":
        baseClass = "add-node-btn";
        break;
      case "action-add":
        baseClass = "tree-action-btn tree-action-btn--add";
        break;
      case "action-delete":
        baseClass = "tree-action-btn tree-action-btn--delete";
        break;
      case "toggle":
        baseClass = "tree-node-toggle";
        break;
      default:
        baseClass = "add-root-btn";
    }

    return (
      <button 
        ref={ref} 
        className={`${baseClass} ${className}`} 
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <span className="spinner spinner--small" />}
        {!isLoading && children}
      </button>
    );
  }
);

Button.displayName = "Button";
