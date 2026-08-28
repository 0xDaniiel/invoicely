// src/components/invoice-preview/DownloadPdfButton.tsx
"use client";

import dynamic from "next/dynamic";
import type { Invoice } from "@/types/invoice";
import { InvoiceDocument } from "@/components/invoice-pdf/InvoiceDocument";

// PDFDownloadLink also touches browser-only APIs to build the blob — client-only.
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => (
      <button
        disabled
        className="rounded-md bg-indigo-600/50 px-4 py-2 text-sm font-medium text-white"
      >
        Preparing…
      </button>
    ),
  },
);

interface DownloadPdfButtonProps {
  invoice: Invoice;
  walletQrCodeDataUrl: string | null;
}

function fileName(invoice: Invoice) {
  const client = invoice.client.name?.trim().replace(/\s+/g, "-") || "invoice";
  const date = new Date().toISOString().slice(0, 10);
  return `${client}-${date}.pdf`;
}

export function DownloadPdfButton({
  invoice,
  walletQrCodeDataUrl,
}: DownloadPdfButtonProps) {
  return (
    <PDFDownloadLink
      document={
        <InvoiceDocument
          invoice={invoice}
          walletQrCodeDataUrl={walletQrCodeDataUrl}
        />
      }
      fileName={fileName(invoice)}
      className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
    >
      {({ loading }: { loading: boolean }) =>
        loading ? "Preparing…" : "Download PDF"
      }
    </PDFDownloadLink>
  );
}
