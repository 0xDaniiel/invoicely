// src/components/dashboard/DeleteInvoiceDialog.tsx
"use client";

import { useEffect, useState } from "react";

interface DeleteInvoiceDialogProps {
  clientLabel: string;
  onConfirm: () => Promise<
    { success: true } | { success: false; error: string }
  >;
  onDeleted: () => void;
  onClose: () => void;
}

export function DeleteInvoiceDialog({
  clientLabel,
  onConfirm,
  onDeleted,
  onClose,
}: DeleteInvoiceDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isDeleting) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, isDeleting]);

  async function handleConfirm() {
    setIsDeleting(true);
    setError(null);
    const result = await onConfirm();
    if (!result.success) {
      setIsDeleting(false);
      setError(result.error);
      return;
    }
    onDeleted();
  }

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
      onClick={() => !isDeleting && onClose()}
    >
      <div
        className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl dark:bg-zinc-950"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="delete-dialog-title"
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
        >
          Delete {clientLabel}?
        </h2>
        <p className="mt-1.5 text-sm text-zinc-500">
          This can&apos;t be undone.
        </p>

        {error && (
          <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-400 dark:hover:bg-zinc-900"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
