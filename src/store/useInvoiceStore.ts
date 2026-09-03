// store/useInvoiceStore.ts
import { create } from "zustand";
import type {
  BankDetails,
  BusinessInfo,
  ClientInfo,
  Invoice,
  LineItem,
  PaymentLink,
  PaymentMethodType,
  WalletDetails,
} from "@/types/invoice";

function makeEmptyLineItem(): LineItem {
  return {
    id: crypto.randomUUID(),
    description: "",
    quantity: 1,
    rate: 0,
  };
}

const initialInvoice: Invoice = {
  business: { name: "", email: "", address: "" },
  client: { name: "", email: "", address: "" },
  lineItems: [makeEmptyLineItem()],
  taxRate: 0,
  currency: "USD",
  dueDate: null,
  notes: "",
  paymentMethods: {},
  status: "DRAFT",
};

interface InvoiceStore {
  invoice: Invoice;

  // load an existing invoice into the form (edit flow) — see reset() for
  // the opposite: starting a blank new invoice
  loadInvoice: (invoice: Invoice) => void;

  // business / client
  setBusinessInfo: (business: Partial<BusinessInfo>) => void;
  setClientInfo: (client: Partial<ClientInfo>) => void;

  // line items
  addLineItem: () => void;
  updateLineItem: (id: string, patch: Partial<Omit<LineItem, "id">>) => void;
  removeLineItem: (id: string) => void;

  // meta
  setTaxRate: (taxRate: number) => void;
  setCurrency: (currency: string) => void;
  setDueDate: (dueDate: string | null) => void;
  setNotes: (notes: string) => void;

  // payment methods — each is independently toggleable, form supports 1+
  togglePaymentMethod: (type: PaymentMethodType, enabled: boolean) => void;
  setBankDetails: (bank: Partial<BankDetails>) => void;
  setPaymentLink: (link: Partial<PaymentLink>) => void;
  setWalletDetails: (wallet: Partial<WalletDetails>) => void;

  reset: () => void;
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  invoice: initialInvoice,

  loadInvoice: (invoice) => set({ invoice }),

  setBusinessInfo: (business) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        business: { ...state.invoice.business, ...business },
      },
    })),

  setClientInfo: (client) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        client: { ...state.invoice.client, ...client },
      },
    })),

  addLineItem: () =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        lineItems: [...state.invoice.lineItems, makeEmptyLineItem()],
      },
    })),

  updateLineItem: (id, patch) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        lineItems: state.invoice.lineItems.map((item) =>
          item.id === id ? { ...item, ...patch } : item,
        ),
      },
    })),

  removeLineItem: (id) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        // never allow removing the last row — form always shows at least one
        lineItems:
          state.invoice.lineItems.length > 1
            ? state.invoice.lineItems.filter((item) => item.id !== id)
            : state.invoice.lineItems,
      },
    })),

  setTaxRate: (taxRate) =>
    set((state) => ({ invoice: { ...state.invoice, taxRate } })),
  setCurrency: (currency) =>
    set((state) => ({ invoice: { ...state.invoice, currency } })),
  setDueDate: (dueDate) =>
    set((state) => ({ invoice: { ...state.invoice, dueDate } })),
  setNotes: (notes) =>
    set((state) => ({ invoice: { ...state.invoice, notes } })),

  togglePaymentMethod: (type, enabled) =>
    set((state) => {
      const paymentMethods = { ...state.invoice.paymentMethods };
      if (!enabled) {
        delete paymentMethods[type];
      } else if (type === "bank" && !paymentMethods.bank) {
        paymentMethods.bank = {
          bankName: "",
          accountName: "",
          accountNumber: "",
        };
      } else if (type === "link" && !paymentMethods.link) {
        paymentMethods.link = { provider: "", url: "" };
      } else if (type === "wallet" && !paymentMethods.wallet) {
        paymentMethods.wallet = {
          network: "ethereum",
          address: "",
          showQrCode: true,
        };
      }
      return { invoice: { ...state.invoice, paymentMethods } };
    }),

  setBankDetails: (bank) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        paymentMethods: {
          ...state.invoice.paymentMethods,
          bank: {
            ...(state.invoice.paymentMethods.bank as BankDetails),
            ...bank,
          },
        },
      },
    })),

  setPaymentLink: (link) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        paymentMethods: {
          ...state.invoice.paymentMethods,
          link: {
            ...(state.invoice.paymentMethods.link as PaymentLink),
            ...link,
          },
        },
      },
    })),

  setWalletDetails: (wallet) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        paymentMethods: {
          ...state.invoice.paymentMethods,
          wallet: {
            ...(state.invoice.paymentMethods.wallet as WalletDetails),
            ...wallet,
          },
        },
      },
    })),

  reset: () => set({ invoice: initialInvoice }),
}));
