import { type ReactNode } from "react";

import { Icon } from "@/components/icon";

export interface ErrorMessageProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function ErrorMessage({ children, className = "", id }: ErrorMessageProps) {
  if (children === null || children === undefined) {
    return null;
  }

  return (
    <p className={`error-message ${className}`} role="alert" id={id}>
      <Icon name="errorCompact" size={14} className="error-message-icon" />
      <span>{children}</span>
    </p>
  );
}
