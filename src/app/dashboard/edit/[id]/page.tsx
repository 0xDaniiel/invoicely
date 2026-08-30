import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import type {
  BusinessInfo,
  ClientInfo,
  Invoice,
  LineItem,
  PaymentMethods,
} from "@/types/invoice";
import { InvoiceWorkspace } from "@/components/invoice-preview/InvoiceWorkspace";
import { EditInvoiceLoader } from "@/components/invoice-preview/EditInvoiceLoader";

export default async function EditInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  // Scoped to userId, not just id — a wrong id and someone else's id both
  // resolve to the same 404, so nothing about other users' invoices leaks.
  const row = await prisma.invoice.findFirst({
    where: { id, userId: session!.user.id },
  });

  if (!row) {
    notFound();
  }

  // Cast via `unknown` since Prisma's Json columns come back as the broad
  // JsonValue union — safe here because these rows are only ever written by
  // createInvoice/updateInvoice, both guarded by the Zod schema in
  // src/lib/validations/invoice.ts.
  const invoice: Invoice = {
    business: row.businessInfo as unknown as BusinessInfo,
    client: row.client as unknown as ClientInfo,
    lineItems: row.lineItems as unknown as LineItem[],
    taxRate: Number(row.taxRate),
    currency: row.currency,
    dueDate: row.dueDate ? row.dueDate.toISOString() : null,
    notes: row.notes ?? "",
    paymentMethods: row.paymentMethod as unknown as PaymentMethods,
    status: row.status,
  };

  return (
    <div>
      <header className="mx-auto mb-8 w-full max-w-2xl">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Edit invoice
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
          Editing the invoice for {invoice.client.name || "this client"}.
        </p>
      </header>
      <EditInvoiceLoader invoice={invoice} />
      <InvoiceWorkspace invoiceId={row.id} />
    </div>
  );
}
