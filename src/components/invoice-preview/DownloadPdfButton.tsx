// src/components/invoice-preview/DownloadPdfButton.tsx
"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Download, Loader2 } from "lucide-react";
import type { Invoice } from "@/types/invoice";
import { InvoiceDocument } from "@/components/invoice-pdf/InvoiceDocument";
import { markInvoiceAsSent } from "@/app/actions/invoice";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => (
      <button
        disabled
        className="rounded-md bg-primary/50 px-4 py-2 text-sm font-medium text-white"
      >
        Preparing…
      </button>
    ),
  },
);

interface DownloadPdfButtonProps {
  invoice: Invoice;
  walletQrCodeDataUrl: string | null;
  variant?: "button" | "icon" | "menuItem";
  invoiceId?: string;
}

function fileName(invoice: Invoice) {
  const client = invoice.client.name?.trim().replace(/\s+/g, "-") || "invoice";
  const date = new Date().toISOString().slice(0, 10);
  return `${client}-${date}.pdf`;
}

const menuItemClass =
  "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800";

export function DownloadPdfButton({
  invoice,
  walletQrCodeDataUrl,
  variant = "button",
  invoiceId,
}: DownloadPdfButtonProps) {
  const router = useRouter();

  function handleClick() {
    if (!invoiceId) return;
    markInvoiceAsSent(invoiceId).then(() => router.refresh());
  }

  const document = (
    <InvoiceDocument
      invoice={invoice}
      walletQrCodeDataUrl={walletQrCodeDataUrl}
    />
  );

  if (variant === "icon") {
    return (
      <PDFDownloadLink
        document={document}
        fileName={fileName(invoice)}
        title="Download PDF"
        aria-label="Download invoice as PDF"
        onClick={handleClick}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-primary dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-primary"
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

  if (variant === "menuItem") {
    return (
      <PDFDownloadLink
        document={document}
        fileName={fileName(invoice)}
        onClick={handleClick}
        className={menuItemClass}
      >
        {({ loading }: { loading: boolean }) => (
          <>
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Download size={16} />
            )}
            Download PDF
          </>
        )}
      </PDFDownloadLink>
    );
  }

  return (
    <PDFDownloadLink
      document={document}
      fileName={fileName(invoice)}
      onClick={handleClick}
      className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
    >
      {({ loading }: { loading: boolean }) =>
        loading ? "Preparing…" : "Download PDF"
      }
    </PDFDownloadLink>
  );
}
