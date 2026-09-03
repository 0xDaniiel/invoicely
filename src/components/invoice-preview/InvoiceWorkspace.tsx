// src/components/invoice-preview/InvoiceWorkspace.tsx
"use client";

import { useEffect, useState } from "react";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useWalletQrCode } from "@/hooks/useWalletQrCode";
import { useAutosaveInvoice } from "@/hooks/useAutosaveInvoice";
import { InvoiceForm } from "@/components/invoice-form/InvoiceForm";
import { InvoicePreviewModal } from "./InvoicePreviewModal";
import { PreviewButton } from "./PreviewButton";
import { DownloadPdfButton } from "./DownloadPdfButton";
import { SaveInvoiceButton } from "./SaveInvoiceButton";
import { AutosaveIndicator } from "./AutosaveIndicator";

export function InvoiceWorkspace({ invoiceId }: { invoiceId?: string }) {
  const invoice = useInvoiceStore((s) => s.invoice);
  const reset = useInvoiceStore((s) => s.reset);
  const walletQrCodeDataUrl = useWalletQrCode(invoice.paymentMethods.wallet);
  const [isPreviewOpen, setPreviewOpen] = useState(false);

  // Shared between autosave and the manual Save button — once autosave
  // creates the row, the manual button must know about it too, or clicking
  // Save right after would create a second row instead of updating the first.
  const [currentId, setCurrentId] = useState(invoiceId);
  const { status: autosaveStatus, error: autosaveError } = useAutosaveInvoice(
    invoice,
    currentId,
    setCurrentId,
  );

  useEffect(() => {
    // Without invoiceId this is genuinely a "new invoice" mount, not an
    // edit — the store is a single shared instance, so without this it
    // would still hold whatever was last loaded (e.g. via EditInvoiceLoader
    // on a previous /dashboard/edit/[id] visit).
    if (!invoiceId) {
      reset();
    }
    // Only run on mount for this route — invoiceId doesn't change within a
    // single mount of this component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col">
      <InvoiceForm />
      <div className="mt-6 flex items-center justify-end gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <AutosaveIndicator status={autosaveStatus} error={autosaveError} />
        <PreviewButton onClick={() => setPreviewOpen(true)} />
        <DownloadPdfButton
          invoice={invoice}
          walletQrCodeDataUrl={walletQrCodeDataUrl}
          invoiceId={currentId}
        />
        <SaveInvoiceButton invoice={invoice} invoiceId={currentId} />
      </div>

      {/* PDFViewer only mounts once the modal opens — no background re-render on every keystroke */}
      {isPreviewOpen && (
        <InvoicePreviewModal
          invoice={invoice}
          walletQrCodeDataUrl={walletQrCodeDataUrl}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </div>
  );
}
