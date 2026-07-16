import { type ReactNode } from "react";

import { Icon } from "@/components/icon";

export interface SuccessMessageProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SuccessMessage({ children, className = "", id }: SuccessMessageProps) {
  if (children === null || children === undefined) {
    return null;
  }

  return (
    <p className={`success-message ${className}`} role="status" id={id}>
      <Icon name="checkCompact" size={14} className="success-message-icon" />
      <span>{children}</span>
    </p>
  );
}
