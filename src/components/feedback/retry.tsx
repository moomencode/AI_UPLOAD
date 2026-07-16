import { Button } from "@/components/button";

export interface RetryProps {
  onRetry: () => void;
  label?: string;
  loading?: boolean;
  className?: string;
}

export function Retry({ onRetry, label = "Retry", loading = false, className = "" }: RetryProps) {
  return (
    <Button
      variant="secondary"
      icon="refresh"
      onClick={onRetry}
      loading={loading}
      className={className}
    >
      {loading ? "Retrying..." : label}
    </Button>
  );
}
