import { type ReactNode } from "react";

export interface NotificationBadgeProps {
  count?: number;
  maxCount?: number;
  dot?: boolean;
  children?: ReactNode;
  className?: string;
}

export function NotificationBadge({
  count,
  maxCount = 99,
  dot = false,
  children,
  className = "",
}: NotificationBadgeProps) {
  const showCount = count !== undefined && count > 0 && !dot;
  const showDot = dot && (count === undefined || count > 0);

  const displayCount =
    count !== undefined && count > maxCount ? `${maxCount}+` : String(count ?? 0);

  return (
    <span className={`badge-wrapper ${className}`}>
      {children}
      {showCount ? (
        <span className="badge badge-count" role="status" aria-label={`${count} notifications`}>
          {displayCount}
        </span>
      ) : null}
      {showDot ? <span className="badge badge-dot" aria-label="Unread notifications" /> : null}
    </span>
  );
}
