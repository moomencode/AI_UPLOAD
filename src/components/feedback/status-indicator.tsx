export type StatusVariant = "success" | "error" | "warning" | "info" | "neutral";

export interface StatusIndicatorProps {
  variant?: StatusVariant;
  label?: string;
  pulse?: boolean;
  className?: string;
}

export function StatusIndicator({
  variant = "neutral",
  label,
  pulse = false,
  className = "",
}: StatusIndicatorProps) {
  return (
    <span className={`status-indicator ${className}`}>
      <span
        className={`status-dot status-dot-${variant} ${pulse ? "status-pulse" : ""}`}
        aria-hidden="true"
      />
      {label !== undefined ? <span className="status-label">{label}</span> : null}
    </span>
  );
}
