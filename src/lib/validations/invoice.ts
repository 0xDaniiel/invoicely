// src/lib/validations/invoice.ts
import { z } from "zod";

// Deliberately lenient: this validates a SAVED DRAFT, not a finalized,
// ready-to-send invoice. The only thing required to save is a client name
// (so the invoice has something identifiable in the history list) —
// everything else can be filled in over multiple edits. Stricter
// requirements (valid email formats, a real payment method, non-empty line
// items) belong on a future "send" action, not here.

const lineItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  quantity: z.number(),
  rate: z.number(),
});

const bankDetailsSchema = z.object({
  bankName: z.string(),
  accountName: z.string(),
  accountNumber: z.string(),
  routingOrSwift: z.string().optional(),
});

const paymentLinkSchema = z.object({
  provider: z.string(),
  url: z.string(),
});

const walletDetailsSchema = z.object({
  network: z.string(),
  address: z.string(),
  showQrCode: z.boolean(),
});

const paymentMethodsSchema = z.object({
  bank: bankDetailsSchema.optional(),
  link: paymentLinkSchema.optional(),
  wallet: walletDetailsSchema.optional(),
});

export const createInvoiceSchema = z.object({
  business: z.object({
    name: z.string(),
    email: z.string(),
    address: z.string(),
  }),
  client: z.object({
    name: z.string().min(1, "Client name is required"),
    email: z.string(),
    address: z.string(),
  }),
  lineItems: z.array(lineItemSchema),
  taxRate: z.number(),
  currency: z.string().length(3, "Currency must be a 3-letter ISO code"),
  dueDate: z.string().nullable(),
  notes: z.string(),
  paymentMethods: paymentMethodsSchema,
});

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
