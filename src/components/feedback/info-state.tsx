import { type ReactNode } from "react";

import { Icon } from "@/components/icon";

export interface InfoStateProps {
  title?: ReactNode;
  message?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function InfoState({
  title = "Did you know?",
  message,
  action,
  className = "",
}: InfoStateProps) {
  return (
    <div className={`state-container state-info ${className}`}>
      <div className="state-icon">
        <Icon name="infoCircle" size={48} />
      </div>
      <h3 className="state-title">{title}</h3>
      {message !== undefined ? <p className="state-message">{message}</p> : null}
      {action !== undefined ? <div className="state-action">{action}</div> : null}
    </div>
  );
}
