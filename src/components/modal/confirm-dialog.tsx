import { type ReactNode } from "react";

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "./modal";

import { Button } from "@/components/button";

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: ReactNode;
  message: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "primary" | "danger";
  loading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "primary",
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" animated>
      <ModalOverlay />
      <ModalContent
        role="alertdialog"
        ariaLabel={typeof title === "string" ? String(title) : "Confirm"}
      >
        <ModalHeader showCloseButton={false}>{title}</ModalHeader>
        <ModalBody>
          <p className="dialog-message">{message}</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === "danger" ? "danger" : "primary"}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
