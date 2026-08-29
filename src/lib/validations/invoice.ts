// src/lib/validations/invoice.ts
import { z } from "zod";

// Mirrors the shape in src/types/invoice.ts, but as a runtime-checked schema.
// The client-side types keep the form honest at compile time; this is what
// actually protects the database — client state can be tampered with
// (devtools, a modified request), so nothing here trusts the client blindly.

const lineItemSchema = z.object({
  id: z.string(),
  description: z.string().min(1, "Line item description is required"),
  quantity: z.number().nonnegative(),
  rate: z.number().nonnegative(),
});

const bankDetailsSchema = z.object({
  bankName: z.string(),
  accountName: z.string(),
  accountNumber: z.string(),
  routingOrSwift: z.string().optional(),
});

const paymentLinkSchema = z.object({
  provider: z.string(),
  url: z.string().url("Payment link must be a valid URL"),
});

const walletDetailsSchema = z.object({
  network: z.string(),
  address: z.string(),
  showQrCode: z.boolean(),
});

const paymentMethodsSchema = z
  .object({
    bank: bankDetailsSchema.optional(),
    link: paymentLinkSchema.optional(),
    wallet: walletDetailsSchema.optional(),
  })
  .refine((methods) => methods.bank || methods.link || methods.wallet, {
    message: "At least one payment method is required",
  });

export const createInvoiceSchema = z.object({
  business: z.object({
    name: z.string().min(1, "Business name is required"),
    email: z.string().email(),
    address: z.string(),
  }),
  client: z.object({
    name: z.string().min(1, "Client name is required"),
    email: z.string().email("A valid client email is required"),
    address: z.string(),
  }),
  lineItems: z
    .array(lineItemSchema)
    .min(1, "At least one line item is required"),
  taxRate: z.number().min(0).max(100),
  currency: z.string().length(3, "Currency must be a 3-letter ISO code"),
  dueDate: z.string().nullable(),
  notes: z.string(),
  paymentMethods: paymentMethodsSchema,
});

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
