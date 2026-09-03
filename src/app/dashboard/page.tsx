import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { InvoiceHistoryList } from "@/components/dashboard/InvoiceHistoryList";
import { getEffectiveStatus } from "@/lib/invoice-status";
import type {
  BusinessInfo,
  ClientInfo,
  InvoiceRecord,
  LineItem,
  PaymentMethods,
} from "@/types/invoice";

export default async function DashboardHistoryPage() {
  // Middleware guarantees a session exists for this route; session.user.id
  // is what scopes this query to only the signed-in user's own invoices.
  const session = await auth();

  const rows = await prisma.invoice.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
  });

  // Json columns come back from Prisma as `Prisma.JsonValue` — cast here to
  // the shapes we know we wrote (see src/app/actions/invoice.ts, which is
  // the only place these rows are ever created, guarded by the Zod schema
  // in src/lib/validations/invoice.ts).
  const invoices: InvoiceRecord[] = rows.map((row) => {
    const dueDate = row.dueDate ? row.dueDate.toISOString() : null;
    return {
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      // Overdue is never stored — it's computed here from the stored
      // status + due date every time the list is read. See
      // src/lib/invoice-status.ts for why.
      status: getEffectiveStatus(row.status, dueDate),
      currency: row.currency,
      taxRate: Number(row.taxRate),
      dueDate,
      notes: row.notes ?? "",
      business: row.businessInfo as unknown as BusinessInfo,
      client: row.client as unknown as ClientInfo,
      lineItems: row.lineItems as unknown as LineItem[],
      paymentMethods: row.paymentMethod as unknown as PaymentMethods,
    };
  });

  return (
    <div className="mx-auto w-full max-w-4xl">
      <header className="mb-8">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Invoice history
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          {invoices.length} invoice{invoices.length === 1 ? "" : "s"}
        </p>
      </header>
      <InvoiceHistoryList invoices={invoices} />
    </div>
  );
}
