import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | null;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, ...props }, ref) => {
    const inputClass = `add-node-input ${error ? "add-node-input--error" : ""} ${className}`;

    return (
      <div className="add-node-input-container">
        <input ref={ref} className={inputClass} {...props} />
        {error && <div className="add-node-error-message">{error}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";
