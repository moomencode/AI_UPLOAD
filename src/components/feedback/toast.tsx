"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

import { Icon, type IconName } from "@/components/icon";

export type ToastVariant = "success" | "error" | "warning" | "info";

const toastIconMap: Record<ToastVariant, IconName> = {
  success: "checkCircle",
  error: "errorCircle",
  warning: "warning",
  info: "info",
};

export interface ToastOptions {
  message: ReactNode;
  variant?: ToastVariant;
  duration?: number;
  onClose?: () => void;
}

interface ToastItem {
  id: string;
  message: ReactNode;
  variant: ToastVariant;
  duration: number;
  exiting: boolean;
}

interface ToastContextValue {
  addToast: (options: ToastOptions) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastCounter = 0;

function generateId(): string {
  toastCounter += 1;
  return `toast-${toastCounter}-${Date.now()}`;
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (ctx === null) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return ctx;
}

export interface ToastProviderProps {
  children: ReactNode;
  position?:
    "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
  maxToasts?: number;
}

export function ToastProvider({
  children,
  position = "top-right",
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const startExit = useCallback(
    (id: string) => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
      setTimeout(() => {
        removeToast(id);
      }, 150);
    },
    [removeToast],
  );

  const addToast = useCallback(
    (options: ToastOptions) => {
      const id = generateId();
      const toast: ToastItem = {
        id,
        message: options.message,
        variant: options.variant ?? "info",
        duration: options.duration ?? 4000,
        exiting: false,
      };

      setToasts((prev) => {
        const next = [...prev, toast];
        return next.length > maxToasts ? next.slice(next.length - maxToasts) : next;
      });

      if (toast.duration > 0) {
        setTimeout(() => {
          startExit(id);
        }, toast.duration);
      }

      return id;
    },
    [maxToasts, startExit],
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} position={position} onDismiss={startExit} />
    </ToastContext.Provider>
  );
}

/* ─── ToastContainer ──────────────────────────────────────────────── */

interface ToastContainerProps {
  toasts: ToastItem[];
  position: ToastProviderProps["position"];
  onDismiss: (id: string) => void;
}

function ToastContainer({ toasts, position, onDismiss }: ToastContainerProps) {
  const positionClass =
    position !== undefined ? `toast-container-${position}` : "toast-container-top-right";

  return (
    <div
      className={`toast-container ${positionClass}`}
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
      ))}
    </div>
  );
}

/* ─── ToastItem ───────────────────────────────────────────────────── */

interface ToastItemProps {
  toast: ToastItem;
  onDismiss: () => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const variantClass = `toast-${toast.variant}`;
  const exitClass = toast.exiting ? "toast-exit" : "toast-enter";

  return (
    <div className={`toast ${variantClass} ${exitClass}`} role="alert">
      <Icon name={toastIconMap[toast.variant]} size={18} className="toast-icon" />
      <span className="toast-message">{toast.message}</span>
      <button
        type="button"
        className="toast-dismiss"
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        <Icon name="close" size={16} />
      </button>
    </div>
  );
}
