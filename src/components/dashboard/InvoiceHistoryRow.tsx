// src/components/dashboard/InvoiceHistoryRow.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { InvoiceRecord } from "@/types/invoice";
import { calculateTotal } from "@/types/invoice";
import { formatCurrency } from "@/lib/format";
import { useWalletQrCode } from "@/hooks/useWalletQrCode";
import { InvoicePreviewModal } from "@/components/invoice-preview/InvoicePreviewModal";
import { DownloadPdfButton } from "@/components/invoice-preview/DownloadPdfButton";
import { deleteInvoice } from "@/app/actions/invoice";
import { DeleteInvoiceDialog } from "./DeleteInvoiceDialog";
import { StatusBadge } from "./StatusBadge";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function InvoiceHistoryRow({ invoice }: { invoice: InvoiceRecord }) {
  const router = useRouter();
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const walletQrCodeDataUrl = useWalletQrCode(invoice.paymentMethods.wallet);
  const total = calculateTotal(invoice.lineItems, invoice.taxRate);

  return (
    <>
      <div className="flex flex-col gap-3 border-b border-zinc-200 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {invoice.client.name || "Untitled client"}
            </p>
            <StatusBadge status={invoice.status} />
          </div>
          <p className="mt-0.5 text-xs text-zinc-500">
            {formatDate(invoice.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm tabular-nums text-zinc-700 dark:text-zinc-300">
            {formatCurrency(total, invoice.currency)}
          </span>
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            title="View"
            aria-label="View invoice"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-indigo-600 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-indigo-400"
          >
            <Eye size={16} />
          </button>
          <Link
            href={`/dashboard/edit/${invoice.id}`}
            title="Edit"
            aria-label="Edit invoice"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-indigo-600 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-indigo-400"
          >
            <Pencil size={16} />
          </Link>
          <DownloadPdfButton
            invoice={invoice}
            walletQrCodeDataUrl={walletQrCodeDataUrl}
            iconOnly
          />
          <button
            type="button"
            onClick={() => setDeleteDialogOpen(true)}
            title="Delete"
            aria-label="Delete invoice"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950 dark:hover:text-red-300"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {isPreviewOpen && (
        <InvoicePreviewModal
          invoice={invoice}
          walletQrCodeDataUrl={walletQrCodeDataUrl}
          onClose={() => setPreviewOpen(false)}
        />
      )}

      {isDeleteDialogOpen && (
        <DeleteInvoiceDialog
          clientLabel={invoice.client.name || "this invoice"}
          onConfirm={() => deleteInvoice(invoice.id)}
          onDeleted={() => {
            // revalidatePath in the action invalidates the cached data;
            // refresh() re-fetches this Server Component so the row
            // actually disappears without a full page reload.
            router.refresh();
          }}
          onClose={() => setDeleteDialogOpen(false)}
        />
      )}
    </>
  );
}
