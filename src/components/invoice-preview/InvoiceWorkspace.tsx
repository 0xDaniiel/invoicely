// src/components/invoice-preview/InvoiceWorkspace.tsx
"use client";

import { useState } from "react";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useWalletQrCode } from "@/hooks/useWalletQrCode";
import { InvoiceForm } from "@/components/invoice-form/InvoiceForm";
import { InvoicePreviewModal } from "./InvoicePreviewModal";
import { PreviewButton } from "./PreviewButton";
import { DownloadPdfButton } from "./DownloadPdfButton";

export function InvoiceWorkspace() {
  const invoice = useInvoiceStore((s) => s.invoice);
  const walletQrCodeDataUrl = useWalletQrCode(invoice.paymentMethods.wallet);
  const [isPreviewOpen, setPreviewOpen] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col">
      <InvoiceForm />
      <div className="mt-6 flex justify-end gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <PreviewButton onClick={() => setPreviewOpen(true)} />
        <DownloadPdfButton
          invoice={invoice}
          walletQrCodeDataUrl={walletQrCodeDataUrl}
        />
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
