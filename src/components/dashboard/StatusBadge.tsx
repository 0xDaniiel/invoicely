// src/components/dashboard/StatusBadge.tsx
import type { InvoiceStatus } from "@/types/invoice";

const STATUS_CONFIG: Record<
  InvoiceStatus,
  { label: string; className: string }
> = {
  DRAFT: {
    label: "Draft",
    className: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  },
  SENT: {
    label: "Sent",
    className: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  },
  PAID: {
    label: "Paid",
    className:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  },
  OVERDUE: {
    label: "Overdue",
    className: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400",
  },
};

export function StatusBadge({ status }: { status: InvoiceStatus }) {
  const { label, className } = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}
