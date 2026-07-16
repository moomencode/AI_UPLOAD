import { type ReactNode } from "react";

import { Icon } from "@/components/icon";

export interface SuccessStateProps {
  title?: ReactNode;
  message?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function SuccessState({
  title = "Success!",
  message,
  action,
  className = "",
}: SuccessStateProps) {
  return (
    <div className={`state-container state-success ${className}`}>
      <div className="state-icon">
        <Icon name="checkCircleOutline" size={48} />
      </div>
      <h3 className="state-title">{title}</h3>
      {message !== undefined ? <p className="state-message">{message}</p> : null}
      {action !== undefined ? <div className="state-action">{action}</div> : null}
    </div>
  );
}
