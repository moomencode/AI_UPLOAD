import { type ReactNode } from "react";

import { Icon, type IconName } from "@/components/icon";

export type ResultVariant = "success" | "error" | "warning" | "info";

const resultIconMap: Record<ResultVariant, IconName> = {
  success: "checkCircleOutline",
  error: "errorCircleOutline",
  warning: "warningTriangle",
  info: "infoCircle",
};

export interface ResultScreenProps {
  variant?: ResultVariant;
  icon?: ReactNode;
  title: ReactNode;
  message?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  className?: string;
}

export function ResultScreen({
  variant = "info",
  icon,
  title,
  message,
  primaryAction,
  secondaryAction,
  className = "",
}: ResultScreenProps) {
  return (
    <div className={`result-screen ${className}`}>
      <div className={`result-icon result-icon-${variant}`}>
        {icon ?? <Icon name={resultIconMap[variant]} size={64} />}
      </div>
      <h2 className="result-title">{title}</h2>
      {message !== undefined ? <p className="result-message">{message}</p> : null}
      <div className="result-actions">
        {primaryAction !== undefined ? (
          <div className="result-action-primary">{primaryAction}</div>
        ) : null}
        {secondaryAction !== undefined ? (
          <div className="result-action-secondary">{secondaryAction}</div>
        ) : null}
      </div>
    </div>
  );
}
