import { type ReactNode } from "react";

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody } from "./modal";

export interface FullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: ReactNode;
}

export function FullscreenModal({ isOpen, onClose, children, title }: FullscreenModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" animated>
      <ModalOverlay />
      <ModalContent
        className="fullscreen-modal"
        ariaLabel={typeof title === "string" ? String(title) : "Fullscreen"}
      >
        <ModalHeader showCloseButton>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
