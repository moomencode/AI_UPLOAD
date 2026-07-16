interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = "" }: PageWrapperProps) {
  return (
    <div className={`page-wrapper ${className}`}>
      <main>{children}</main>
    </div>
  );
}
