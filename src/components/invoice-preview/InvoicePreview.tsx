// src/components/invoice-preview/InvoicePreview.tsx
"use client";

import dynamic from "next/dynamic";
import type { Invoice } from "@/types/invoice";

const PdfFrame = dynamic(() => import("./PdfFrame").then((m) => m.PdfFrame), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-zinc-400">
      Loading preview…
    </div>
  ),
});

interface InvoicePreviewProps {
  invoice: Invoice;
  walletQrCodeDataUrl: string | null;
}

export function InvoicePreview({
  invoice,
  walletQrCodeDataUrl,
}: InvoicePreviewProps) {
  return (
    <PdfFrame invoice={invoice} walletQrCodeDataUrl={walletQrCodeDataUrl} />
  );
}
