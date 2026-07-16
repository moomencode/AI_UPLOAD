export interface ProgressBarProps {
  value?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "success" | "warning" | "error";
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  size = "md",
  variant = "primary",
  showLabel = false,
  className = "",
}: ProgressBarProps) {
  const isIndeterminate = value === undefined;
  const percent = isIndeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100));

  const sizeClass = size === "sm" ? "progress-sm" : size === "lg" ? "progress-lg" : "";
  const variantClass = `progress-${variant}`;
  const indeterminateClass = isIndeterminate ? "progress-indeterminate" : "";

  return (
    <div
      className={`progress ${sizeClass} ${className}`}
      role="progressbar"
      aria-valuenow={isIndeterminate ? undefined : percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={showLabel ? `${Math.round(percent)}%` : "Progress"}
    >
      <div
        className={`progress-bar ${variantClass} ${indeterminateClass}`}
        style={{ width: isIndeterminate ? undefined : `${percent}%` }}
      />
      {showLabel && !isIndeterminate ? (
        <span className="progress-label">{Math.round(percent)}%</span>
      ) : null}
    </div>
  );
}
