import { type ReactNode } from "react";

import { Icon } from "@/components/icon";

export type BannerVariant = "success" | "error" | "warning" | "info";

export interface BannerProps {
  children: ReactNode;
  variant?: BannerVariant;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export function Banner({
  children,
  variant = "info",
  dismissible = false,
  onDismiss,
  className = "",
}: BannerProps) {
  return (
    <div className={`banner banner-${variant} ${className}`} role="alert">
      <span className="banner-message">{children}</span>
      {dismissible ? (
        <button
          type="button"
          className="banner-dismiss"
          onClick={onDismiss}
          aria-label="Dismiss banner"
        >
          <Icon name="close" size={16} />
        </button>
      ) : null}
    </div>
  );
}
