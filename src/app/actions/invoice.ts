// src/app/actions/invoice.ts
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  createInvoiceSchema,
  type CreateInvoiceInput,
} from "@/lib/validations/invoice";

type CreateInvoiceResult =
  | { success: true; invoiceId: string }
  | { success: false; error: string };

export async function createInvoice(
  input: CreateInvoiceInput,
): Promise<CreateInvoiceResult> {
  const session = await auth();
  if (!session?.user?.id) {
    // Defense in depth: the UI already hides/disables Save for signed-out
    // users, but a server action is a public endpoint regardless of what
    // the UI does — it must enforce this on its own.
    return {
      success: false,
      error: "You must be signed in to save an invoice.",
    };
  }

  const parsed = createInvoiceSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid invoice data.",
    };
  }
  const invoice = parsed.data;

  const created = await prisma.invoice.create({
    data: {
      userId: session.user.id,
      clientName: invoice.client.name,
      clientEmail: invoice.client.email,
      client: invoice.client,
      businessInfo: invoice.business,
      lineItems: invoice.lineItems,
      taxRate: invoice.taxRate,
      currency: invoice.currency,
      dueDate: invoice.dueDate ? new Date(invoice.dueDate) : null,
      notes: invoice.notes || null,
      paymentMethod: invoice.paymentMethods,
      // status defaults to DRAFT — see prisma/schema.prisma
    },
    select: { id: true },
  });

  return { success: true, invoiceId: created.id };
}

type UpdateInvoiceResult =
  | { success: true }
  | { success: false; error: string };

export async function updateInvoice(
  invoiceId: string,
  input: CreateInvoiceInput,
): Promise<UpdateInvoiceResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      success: false,
      error: "You must be signed in to save an invoice.",
    };
  }

  const parsed = createInvoiceSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid invoice data.",
    };
  }
  const invoice = parsed.data;

  // `updateMany` with userId in the where clause, rather than `update` by id
  // alone, so this can never touch a row owned by someone else — matching
  // zero rows (wrong id OR wrong owner) both look identical from outside,
  // which is the point: no information leaks about invoices you don't own.
  const result = await prisma.invoice.updateMany({
    where: { id: invoiceId, userId: session.user.id },
    data: {
      clientName: invoice.client.name,
      clientEmail: invoice.client.email,
      client: invoice.client,
      businessInfo: invoice.business,
      lineItems: invoice.lineItems,
      taxRate: invoice.taxRate,
      currency: invoice.currency,
      dueDate: invoice.dueDate ? new Date(invoice.dueDate) : null,
      notes: invoice.notes || null,
      paymentMethod: invoice.paymentMethods,
    },
  });

  if (result.count === 0) {
    return { success: false, error: "Invoice not found." };
  }
  return { success: true };
}
