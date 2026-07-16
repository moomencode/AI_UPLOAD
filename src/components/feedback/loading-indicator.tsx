import { type ReactNode } from "react";

import { Spinner, type SpinnerProps } from "./spinner";

export interface LoadingIndicatorProps {
  message?: ReactNode;
  spinnerSize?: SpinnerProps["size"];
  fullScreen?: boolean;
  className?: string;
}

export function LoadingIndicator({
  message = "Loading...",
  spinnerSize = "lg",
  fullScreen = false,
  className = "",
}: LoadingIndicatorProps) {
  return (
    <div
      className={`loading-indicator ${fullScreen ? "loading-fullscreen" : ""} ${className}`}
      role="status"
      aria-live="polite"
    >
      <Spinner size={spinnerSize} />
      {message !== undefined ? <p className="loading-message">{message}</p> : null}
    </div>
  );
}
