import { type ReactNode } from "react";

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "./modal";

import { Button } from "@/components/button";

export interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  message: ReactNode;
  confirmLabel?: string;
}

export function AlertDialog({
  isOpen,
  onClose,
  title,
  message,
  confirmLabel = "OK",
}: AlertDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" animated>
      <ModalOverlay />
      <ModalContent
        role="alertdialog"
        ariaLabel={typeof title === "string" ? String(title) : "Alert"}
      >
        <ModalHeader showCloseButton={false}>{title}</ModalHeader>
        <ModalBody>
          <p className="dialog-message">{message}</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={onClose}>
            {confirmLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
