// src/components/invoice-preview/DownloadPdfButton.tsx
"use client";

import dynamic from "next/dynamic";
import { Download, Loader2 } from "lucide-react";
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
  // Compact icon-only rendering for tight spaces (e.g. the History row).
  // Defaults to false so existing usage (the form's action bar) is unchanged.
  iconOnly?: boolean;
}

function fileName(invoice: Invoice) {
  const client = invoice.client.name?.trim().replace(/\s+/g, "-") || "invoice";
  const date = new Date().toISOString().slice(0, 10);
  return `${client}-${date}.pdf`;
}

export function DownloadPdfButton({
  invoice,
  walletQrCodeDataUrl,
  iconOnly = false,
}: DownloadPdfButtonProps) {
  if (iconOnly) {
    return (
      <PDFDownloadLink
        document={
          <InvoiceDocument
            invoice={invoice}
            walletQrCodeDataUrl={walletQrCodeDataUrl}
          />
        }
        fileName={fileName(invoice)}
        title="Download PDF"
        aria-label="Download invoice as PDF"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-indigo-600 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-indigo-400"
      >
        {({ loading }: { loading: boolean }) =>
          loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Download size={16} />
          )
        }
      </PDFDownloadLink>
    );
  }

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
