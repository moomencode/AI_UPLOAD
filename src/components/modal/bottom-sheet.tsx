import { type ReactNode } from "react";

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody } from "./modal";

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: ReactNode;
}

export function BottomSheet({ isOpen, onClose, children, title }: BottomSheetProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" animated>
      <ModalOverlay />
      <ModalContent
        className="bottom-sheet"
        ariaLabel={typeof title === "string" ? String(title) : "Bottom sheet"}
      >
        <ModalHeader showCloseButton>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
