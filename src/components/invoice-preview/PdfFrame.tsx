// src/components/invoice-preview/PdfFrame.tsx
"use client";

import { useEffect, useMemo } from "react";
import { usePDF } from "@react-pdf/renderer";
import type { Invoice } from "@/types/invoice";
import { InvoiceDocument } from "@/components/invoice-pdf/InvoiceDocument";

interface PdfFrameProps {
  invoice: Invoice;
  walletQrCodeDataUrl: string | null;
}

export function PdfFrame({ invoice, walletQrCodeDataUrl }: PdfFrameProps) {
  const invoiceKey = JSON.stringify(invoice);
  const document = useMemo(
    () => (
      <InvoiceDocument
        invoice={invoice}
        walletQrCodeDataUrl={walletQrCodeDataUrl}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [invoiceKey, walletQrCodeDataUrl],
  );

  const [instance, updateInstance] = usePDF({ document });

  useEffect(() => {
    updateInstance(document);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document]);

  if (instance.loading || !instance.url) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-zinc-400">
        Loading preview…
      </div>
    );
  }

  if (instance.error) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-red-500">
        Couldn&apos;t load preview.
      </div>
    );
  }

  return (
    <iframe
      src={`${instance.url}#toolbar=0&navpanes=0&view=FitH`}
      className="h-full w-full border-0"
      title="Invoice preview"
    />
  );
}
