interface SectionProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "zero";
  className?: string;
  as?: "section" | "div" | "article" | "aside";
}

export function Section({
  children,
  size = "md",
  className = "",
  as: Tag = "section",
}: SectionProps) {
  const sizeClass =
    size === "sm"
      ? "section-sm"
      : size === "lg"
        ? "section-lg"
        : size === "zero"
          ? "section-zero"
          : "section";

  return <Tag className={`${sizeClass} ${className}`}>{children}</Tag>;
}
