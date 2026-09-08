// src/components/dashboard/InvoiceHistoryList.tsx
import Link from "next/link";
import type { InvoiceRecord } from "@/types/invoice";
import { InvoiceHistoryRow } from "./InvoiceHistoryRow";

export function InvoiceHistoryList({
  invoices,
}: {
  invoices: InvoiceRecord[];
}) {
  if (invoices.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-zinc-300 py-16 text-center dark:border-zinc-700">
        <p className="text-sm text-zinc-500">No invoices yet.</p>
        <Link
          href="/dashboard/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          Create your first invoice
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {invoices.map((invoice) => (
        <InvoiceHistoryRow key={invoice.id} invoice={invoice} />
      ))}
    </div>
  );
}
