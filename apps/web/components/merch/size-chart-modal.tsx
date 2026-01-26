"use client";

import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title?: string;
}

export default function SizeChartModal({ isOpen, onClose, imageSrc, title }: SizeChartModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#1A1A1A] rounded-2xl border border-white/10 p-2 md:p-4 shadow-2xl overflow-hidden animate-scaler2"
        onClick={(e) => e.stopPropagation()}
        style={{ animationDuration: "0.3s", animationIterationCount: 1 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-white/20 text-white transition-colors"
        >
          ✕
        </button>

        {title && <h3 className="text-xl font-bold text-center mb-4 text-white">{title}</h3>}

        <div className="relative w-full aspect-[4/3] md:aspect-[16/9]">
          <Image src={imageSrc} alt="Size Chart" fill className="object-contain" />
        </div>
      </div>
    </div>,
    document.body
  );
}
