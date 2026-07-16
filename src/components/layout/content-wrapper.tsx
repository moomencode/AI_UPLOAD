interface ContentWrapperProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ContentWrapper({ children, size = "md", className = "" }: ContentWrapperProps) {
  const sizeClass =
    size === "sm" ? "content-wrapper-sm" : size === "lg" ? "content-wrapper-lg" : "";

  return <div className={`content-wrapper ${sizeClass} ${className}`}>{children}</div>;
}
