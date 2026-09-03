// src/lib/invoice-status.ts
import type { InvoiceStatus } from "@/types/invoice";

/**
 * The stored status only ever transitions explicitly (Draft → Sent on
 * download, → Paid on manual confirmation). "Overdue" is different — it's
 * purely a function of today's date vs. the due date, so it's computed
 * here at read time rather than written to the database. This keeps it
 * always accurate without needing a scheduled job to sweep for stale rows,
 * and an invoice with no due date simply can never become Overdue — there's
 * nothing to be late against.
 */
export function getEffectiveStatus(
  status: InvoiceStatus,
  dueDate: string | null,
): InvoiceStatus {
  if (status === "SENT" && dueDate && new Date(dueDate) < new Date()) {
    return "OVERDUE";
  }
  return status;
}
