import { useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
  children: ReactNode;
}

export function Portal({ children }: PortalProps) {
  const [mounted] = useState(() => typeof window !== "undefined");

  if (!mounted) {
    return null;
  }

  return createPortal(children, document.body);
}
