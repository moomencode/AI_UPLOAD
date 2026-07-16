import { type ReactNode } from "react";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: ReactNode;
  message?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, message, action, className = "" }: EmptyStateProps) {
  return (
    <div className={`state-container ${className}`}>
      {icon !== undefined ? <div className="state-icon">{icon}</div> : null}
      <h3 className="state-title">{title}</h3>
      {message !== undefined ? <p className="state-message">{message}</p> : null}
      {action !== undefined ? <div className="state-action">{action}</div> : null}
    </div>
  );
}
