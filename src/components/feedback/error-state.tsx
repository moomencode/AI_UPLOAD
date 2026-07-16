import { type ReactNode } from "react";

import { Button } from "@/components/button";
import { Icon } from "@/components/icon";

export interface ErrorStateProps {
  title?: ReactNode;
  message?: ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
  retryLabel = "Try Again",
  className = "",
}: ErrorStateProps) {
  return (
    <div className={`state-container state-error ${className}`}>
      <div className="state-icon">
        <Icon name="exclamationCircle" size={48} />
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
