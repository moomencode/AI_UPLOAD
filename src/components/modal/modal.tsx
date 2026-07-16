import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

import { FocusTrap } from "./focus-trap";
import { Portal } from "./portal";
import { useScrollLock } from "./use-scroll-lock";

import { Icon } from "@/components/icon";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

interface ModalContextValue {
  isOpen: boolean;
  onClose: () => void;
  size: ModalSize;
  animated: boolean;
  dismissible: boolean;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModalContext() {
  const ctx = useContext(ModalContext);
  if (ctx === null) {
    throw new Error("Modal sub-components must be used within a <Modal> parent");
  }
  return ctx;
}

export interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  animated?: boolean;
  dismissible?: boolean;
}

export function Modal({
  children,
  isOpen,
  onClose,
  size = "md",
  animated = true,
  dismissible = true,
}: ModalProps) {
  useScrollLock(isOpen);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalContext.Provider value={{ isOpen, onClose, size, animated, dismissible }}>
      <Portal>{children}</Portal>
    </ModalContext.Provider>
  );
}

/* ─── ModalOverlay ────────────────────────────────────────────────── */

export interface ModalOverlayProps {
  className?: string;
}

export function ModalOverlay({ className = "" }: ModalOverlayProps) {
  const { onClose, animated, dismissible } = useModalContext();

  const handleClick = useCallback(() => {
    if (dismissible) {
      onClose();
    }
  }, [dismissible, onClose]);

  return (
    <div
      className={`modal-overlay ${animated ? "modal-overlay-enter" : ""} ${className}`}
      onClick={handleClick}
      aria-hidden="true"
    />
  );
}

/* ─── ModalContent ────────────────────────────────────────────────── */

export interface ModalContentProps {
  children: ReactNode;
  className?: string;
  role?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
}

export function ModalContent({
  children,
  className = "",
  role = "dialog",
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
}: ModalContentProps) {
  const { onClose, size, animated, isOpen } = useModalContext();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const sizeClass =
    size === "sm"
      ? "modal-content-sm"
      : size === "lg"
        ? "modal-content-lg"
        : size === "xl"
          ? "modal-content-xl"
          : size === "full"
            ? "modal-content-full"
            : "modal-content-md";

  const animClass = animated && mounted ? "modal-content-enter" : "";

  return (
    <FocusTrap active={isOpen}>
      <div className="modal-scroll-wrapper">
        <div
          role={role}
          aria-modal="true"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          className={`modal-content ${sizeClass} ${animClass} ${className}`}
        >
          {children}
        </div>
      </div>
    </FocusTrap>
  );
}

/* ─── ModalHeader ─────────────────────────────────────────────────── */

export interface ModalHeaderProps {
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

export function ModalHeader({
  children,
  className = "",
  showCloseButton = true,
}: ModalHeaderProps) {
  return (
    <div className={`modal-header ${className}`}>
      <div className="modal-header-content">{children}</div>
      {showCloseButton && <ModalCloseButton />}
    </div>
  );
}

/* ─── ModalBody ───────────────────────────────────────────────────── */

export interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

export function ModalBody({ children, className = "" }: ModalBodyProps) {
  return <div className={`modal-body ${className}`}>{children}</div>;
}

/* ─── ModalFooter ─────────────────────────────────────────────────── */

export interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

export function ModalFooter({ children, className = "" }: ModalFooterProps) {
  return <div className={`modal-footer ${className}`}>{children}</div>;
}

/* ─── ModalCloseButton ────────────────────────────────────────────── */

export function ModalCloseButton() {
  const { onClose } = useModalContext();

  return (
    <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
      <Icon name="close" size={20} />
    </button>
  );
}
