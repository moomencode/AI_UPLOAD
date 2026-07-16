import { type ReactNode } from "react";

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody } from "./modal";
import type { ModalSize } from "./modal";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  placement?: "left" | "right" | "bottom";
  size?: ModalSize;
  title?: ReactNode;
}

export function Drawer({
  isOpen,
  onClose,
  children,
  placement = "right",
  size = "md",
  title,
}: DrawerProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} animated>
      <ModalOverlay />
      <ModalContent
        className={`drawer drawer-${placement}`}
        ariaLabel={typeof title === "string" ? String(title) : "Drawer"}
      >
        <ModalHeader showCloseButton>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
