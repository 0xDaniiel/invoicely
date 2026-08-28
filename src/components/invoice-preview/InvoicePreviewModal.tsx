// src/components/invoice-preview/InvoicePreviewModal.tsx
"use client";

import { useEffect } from "react";
import type { Invoice } from "@/types/invoice";
import { InvoicePreview } from "./InvoicePreview";

interface InvoicePreviewModalProps {
  invoice: Invoice;
  walletQrCodeDataUrl: string | null;
  onClose: () => void;
}

export function InvoicePreviewModal({
  invoice,
  walletQrCodeDataUrl,
  onClose,
}: InvoicePreviewModalProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    // lock background scroll while the modal is open — mainly matters on mobile
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Invoice preview"
      className="fixed inset-0 z-50 flex items-stretch justify-center bg-black/40 p-0 sm:items-center sm:p-8"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full flex-col bg-white sm:h-[90vh] sm:max-w-3xl sm:rounded-lg sm:shadow-xl dark:bg-zinc-950"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Preview
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <InvoicePreview
            invoice={invoice}
            walletQrCodeDataUrl={walletQrCodeDataUrl}
          />
        </div>
      </div>
    </div>
  );
}
