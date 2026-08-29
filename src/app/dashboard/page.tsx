// src/app/dashboard/page.tsx
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { InvoiceHistoryList } from "@/components/dashboard/InvoiceHistoryList";
import type {
  BusinessInfo,
  ClientInfo,
  InvoiceRecord,
  LineItem,
  PaymentMethods,
} from "@/types/invoice";

export default async function DashboardHistoryPage() {
  const session = await auth();

  const rows = await prisma.invoice.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
  });

  const invoices: InvoiceRecord[] = rows.map((row) => ({
    id: row.id,
    createdAt: row.createdAt.toISOString(),
    status: row.status,
    currency: row.currency,
    taxRate: Number(row.taxRate),
    dueDate: row.dueDate ? row.dueDate.toISOString() : null,
    notes: row.notes ?? "",
    business: row.businessInfo as unknown as BusinessInfo,
    client: row.client as unknown as ClientInfo,
    lineItems: row.lineItems as unknown as LineItem[],
    paymentMethods: row.paymentMethod as PaymentMethods,
  }));

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
