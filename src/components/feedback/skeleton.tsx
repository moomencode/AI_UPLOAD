export interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export function Skeleton({
  width = "100%",
  height = "1rem",
  borderRadius = "var(--garcia-radius-md)",
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius }}
      aria-hidden="true"
    />
  );
}

/* ─── SkeletonText ────────────────────────────────────────────────── */

export interface SkeletonTextProps {
  lines?: number;
  lastLineWidth?: string;
  className?: string;
}

export function SkeletonText({
  lines = 3,
  lastLineWidth = "60%",
  className = "",
}: SkeletonTextProps) {
  return (
    <div className={`skeleton-text-group ${className}`} aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={`skeleton-line-${i}`}
          width={i === lines - 1 ? lastLineWidth : "100%"}
          height="0.75rem"
        />
      ))}
    </div>
  );
}

/* ─── SkeletonCard ────────────────────────────────────────────────── */

export interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className = "" }: SkeletonCardProps) {
  return (
    <div className={`skeleton-card ${className}`} aria-hidden="true">
      <Skeleton height="10rem" borderRadius="var(--garcia-radius-lg)" />
      <div className="skeleton-card-body">
        <Skeleton width="80%" height="1.25rem" />
        <Skeleton width="100%" height="0.75rem" />
        <Skeleton width="60%" height="0.75rem" />
      </div>
    </div>
  );
}
