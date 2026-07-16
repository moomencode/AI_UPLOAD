import { type ReactNode } from "react";

import { Button } from "@/components/button";
import { Icon } from "@/components/icon";

export interface OfflineStateProps {
  title?: ReactNode;
  message?: ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function OfflineState({
  title = "You're offline",
  message = "Check your connection and try again.",
  onRetry,
  retryLabel = "Retry",
  className = "",
}: OfflineStateProps) {
  return (
    <div className={`state-container state-offline ${className}`}>
      <div className="state-icon">
        <Icon name="offline" size={48} />
      </div>
      <h3 className="state-title">{title}</h3>
      <p className="state-message">{message}</p>
      {onRetry !== undefined ? (
        <div className="state-action">
          <Button variant="primary" onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
