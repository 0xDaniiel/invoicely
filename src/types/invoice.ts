// types/invoice.ts

export type PaymentMethodType = "bank" | "link" | "wallet";

export interface BankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  routingOrSwift?: string;
}

export interface PaymentLink {
  provider: string; // e.g. "Stripe", "Paystack", "Flutterwave", "PayPal.me"
  url: string;
}

export interface WalletDetails {
  network: string; // e.g. "Ethereum", "Solana", "Bitcoin" — TODO: proper network enum + QR network selector (step 7)
  address: string;
  showQrCode: boolean;
}

export interface PaymentMethods {
  bank?: BankDetails;
  link?: PaymentLink;
  wallet?: WalletDetails;
}

export interface BusinessInfo {
  name: string;
  email: string;
  address: string;
  logoUrl?: string; // TODO: logo upload, not in v1 scope
}

export interface ClientInfo {
  name: string;
  email: string;
  address: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  // amount is derived (quantity * rate), not stored — see store selector
}

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue"; // TODO: status tracking is step 7, field reserved now to avoid a later migration

export interface Invoice {
  business: BusinessInfo;
  client: ClientInfo;
  lineItems: LineItem[];
  taxRate: number; // percentage, e.g. 7.5 — TODO: revisit if per-line-item tax is ever needed
  currency: string; // ISO 4217 code, e.g. "USD", "NGN"
  dueDate: string | null; // ISO date string
  notes: string;
  paymentMethods: PaymentMethods;
  status: InvoiceStatus;
}

export function calculateLineItemAmount(item: LineItem): number {
  return item.quantity * item.rate;
}

export function calculateSubtotal(lineItems: LineItem[]): number {
  return lineItems.reduce(
    (sum, item) => sum + calculateLineItemAmount(item),
    0,
  );
}

export function calculateTax(subtotal: number, taxRate: number): number {
  return subtotal * (taxRate / 100);
}

export function calculateTotal(lineItems: LineItem[], taxRate: number): number {
  const subtotal = calculateSubtotal(lineItems);
  return subtotal + calculateTax(subtotal, taxRate);
}
