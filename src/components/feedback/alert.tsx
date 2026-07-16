import { type ReactNode } from "react";

import { Icon } from "@/components/icon";

export type AlertVariant = "success" | "error" | "warning" | "info";

const alertIconMap: Record<AlertVariant, "checkCircle" | "errorCircle" | "warning" | "info"> = {
  success: "checkCircle",
  error: "errorCircle",
  warning: "warning",
  info: "info",
};

export interface AlertProps {
  children: ReactNode;
  variant?: AlertVariant;
  title?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export function Alert({
  children,
  variant = "info",
  title,
  dismissible = false,
  onDismiss,
  className = "",
}: AlertProps) {
  return (
    <div className={`alert alert-${variant} ${className}`} role="alert">
      <Icon name={alertIconMap[variant]} size={18} className="alert-icon" />
      <div className="alert-content">
        {title !== undefined && <p className="alert-title">{title}</p>}
        <div className="alert-message">{children}</div>
      </div>
      {dismissible ? (
        <button type="button" className="alert-dismiss" onClick={onDismiss} aria-label="Dismiss">
          <Icon name="close" size={16} />
        </button>
      ) : null}
    </div>
  );
}
