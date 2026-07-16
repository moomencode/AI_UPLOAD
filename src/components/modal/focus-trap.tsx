import { useRef, useEffect, type ReactNode } from "react";

export interface FocusTrapProps {
  children: ReactNode;
  active: boolean;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function FocusTrap({ children, active }: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) {
      return;
    }

    const container = containerRef.current;
    if (container === null) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getFocusableElements = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null,
      );

    const focusFirst = () => {
      const focusable = getFocusableElements();
      if (focusable.length > 0) {
        const first = focusable[0];
        if (first !== undefined) {
          first.focus();
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") {
        return;
      }

      const focusable = getFocusableElements();
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (first === undefined || last === undefined) {
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    focusFirst();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused !== null && document.body.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [active]);

  return <div ref={containerRef}>{children}</div>;
}
