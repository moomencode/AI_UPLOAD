import { forwardRef, type ButtonHTMLAttributes } from "react";

import { Icon, type IconName } from "@/components/icon";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: IconName;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    icon,
    children,
    className = "",
    disabled,
    ...props
  },
  ref,
) {
  const isDisabled = disabled === true || loading;
  const hasChildren = children !== undefined && children !== null;
  const isIconOnly = !hasChildren && icon !== undefined;

  return (
    <button
      ref={ref}
      className={`btn btn-${variant} btn-${size} ${isIconOnly ? "btn-icon-only" : ""} ${loading ? "btn-loading" : ""} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <span className="btn-spinner">
          <Icon name="close" size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />
        </span>
      ) : null}
      <span className={loading ? "btn-content" : ""}>
        {icon !== undefined ? (
          <Icon name={icon} size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />
        ) : null}
        {children}
      </span>
    </button>
  );
});
