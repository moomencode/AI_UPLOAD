import { type ReactNode } from "react";

import { Modal, ModalOverlay, ModalContent } from "./modal";

import { Icon } from "@/components/icon";

export interface ImagePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  caption?: ReactNode;
}

export function ImagePreview({ isOpen, onClose, src, alt, caption }: ImagePreviewProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" animated>
      <ModalOverlay />
      <ModalContent className="image-preview" ariaLabel={alt}>
        <button
          type="button"
          className="image-preview-close"
          onClick={onClose}
          aria-label="Close image preview"
        >
          <Icon name="close" size={24} />
        </button>
        <div className="image-preview-container">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="image-preview-img" />
          {caption !== undefined && <p className="image-preview-caption">{caption}</p>}
        </div>
      </ModalContent>
    </Modal>
  );
}
