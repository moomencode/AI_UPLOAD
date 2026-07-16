import { type LabelHTMLAttributes } from "react";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
}

export function Label({
  children,
  required = false,
  disabled = false,
  className = "",
  ...props
}: LabelProps) {
  return (
    <label
      className={`label ${disabled ? "label-disabled" : ""} ${className}`}
      aria-required={required ? true : undefined}
      {...props}
    >
      {children}
      {required && <RequiredIndicator />}
    </label>
  );
}

function RequiredIndicator() {
  return (
    <span className="label-required" aria-hidden="true">
      *
    </span>
  );
}
