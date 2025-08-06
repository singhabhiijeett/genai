"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "react-modal";

// Modal will be set inside the component

interface ImageModalProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const ImageModal = ({
  src,
  alt,
  width,
  height,
  className,
}: ImageModalProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // Set app element for modal accessibility
  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement(document.body);
    }
  }, []);

  // Close modal on escape key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // We'll use className instead of style prop for the modal

  return (
    <>
      <div
        onClick={openModal}
        className={`cursor-pointer hover:opacity-90 transition-opacity ${className}`}
        title="Click to enlarge"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={`Full screen ${alt}`}
        className="modal-content"
        overlayClassName="fixed inset-0 bg-black/85 z-50 flex items-center justify-center"
      >
        <div className="relative">
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 bg-black/70 text-white rounded-full p-2 hover:bg-black/90 transition-colors"
            title="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="p-2 bg-black/50 rounded-lg">
            <Image
              src={src}
              alt={alt}
              width={Math.min(width * 2, 1200)} // Larger but with a max size
              height={Math.min(height * 2, 900)}
              className="w-auto h-auto max-w-[90vw] max-h-[85vh] object-contain"
            />
          </div>

          <div className="text-center mt-2 text-white text-sm">{alt}</div>
        </div>
      </Modal>
    </>
  );
};

export default ImageModal;
