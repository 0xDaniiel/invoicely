// src/components/invoice-preview/InvoicePreview.tsx
"use client";

import dynamic from "next/dynamic";
import type { Invoice } from "@/types/invoice";
import { InvoiceDocument } from "@/components/invoice-pdf/InvoiceDocument";

// PDFViewer renders the PDF into an <iframe> using browser APIs — can't be server-rendered.
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-sm text-zinc-400">
        Loading preview…
      </div>
    ),
  },
);

interface InvoicePreviewProps {
  invoice: Invoice;
  walletQrCodeDataUrl: string | null;
}

export function InvoicePreview({
  invoice,
  walletQrCodeDataUrl,
}: InvoicePreviewProps) {
  return (
    <PDFViewer
      width="100%"
      height="100%"
      showToolbar={false}
      style={{ border: "none" }}
    >
      <InvoiceDocument
        invoice={invoice}
        walletQrCodeDataUrl={walletQrCodeDataUrl}
      />
    </PDFViewer>
  );
}
