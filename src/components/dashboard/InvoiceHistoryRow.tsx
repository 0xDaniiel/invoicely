// src/components/dashboard/InvoiceHistoryRow.tsx
"use client";

import { useState } from "react";
import type { InvoiceRecord } from "@/types/invoice";
import { calculateTotal } from "@/types/invoice";
import { formatCurrency } from "@/lib/format";
import { useWalletQrCode } from "@/hooks/useWalletQrCode";
import { InvoicePreviewModal } from "@/components/invoice-preview/InvoicePreviewModal";
import { InvoiceRowActionsMenu } from "./InvoiceRowActionsMenu";
import { StatusBadge } from "./StatusBadge";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function InvoiceHistoryRow({ invoice }: { invoice: InvoiceRecord }) {
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const walletQrCodeDataUrl = useWalletQrCode(invoice.paymentMethods.wallet);
  const total = calculateTotal(invoice.lineItems, invoice.taxRate);

  return (
    <>
      <div className="flex flex-col gap-3 border-b border-zinc-200 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="truncate text-sm font-medium text-zinc-900 transition-colors hover:text-primary hover:underline dark:text-zinc-100 dark:hover:text-primary"
            >
              {invoice.client.name || "Untitled client"}
            </button>
            <StatusBadge status={invoice.status} />
          </div>
          <p className="mt-0.5 text-xs text-zinc-500">
            {formatDate(invoice.createdAt)}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-sm tabular-nums text-zinc-700 dark:text-zinc-300">
            {formatCurrency(total, invoice.currency)}
          </span>
          <InvoiceRowActionsMenu
            invoice={invoice}
            walletQrCodeDataUrl={walletQrCodeDataUrl}
            onView={() => setPreviewOpen(true)}
          />
        </div>
      </div>

      {isPreviewOpen && (
        <InvoicePreviewModal
          invoice={invoice}
          walletQrCodeDataUrl={walletQrCodeDataUrl}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </>
  );
}
