import { type ReactNode } from "react";

export interface HelperTextProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function HelperText({ children, className = "", id }: HelperTextProps) {
  return (
    <p className={`helper-text ${className}`} id={id}>
      {children}
    </p>
  );
}
