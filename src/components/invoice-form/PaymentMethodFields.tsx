// components/invoice-form/PaymentMethodFields.tsx
"use client";

import { PaymentMethodType } from "@/types/invoice";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { WALLET_NETWORKS, type WalletNetwork } from "@/lib/wallet-networks";
import { Field, Section, TextInput } from "./FormPrimitives";

const METHOD_LABELS: Record<PaymentMethodType, string> = {
  bank: "Bank details",
  link: "Payment link",
  wallet: "Crypto wallet",
};

function MethodToggle({ type }: { type: PaymentMethodType }) {
  const enabled = useInvoiceStore((s) =>
    Boolean(s.invoice.paymentMethods[type]),
  );
  const togglePaymentMethod = useInvoiceStore((s) => s.togglePaymentMethod);

  return (
    <button
      type="button"
      onClick={() => togglePaymentMethod(type, !enabled)}
      aria-pressed={enabled}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        enabled
          ? "border-indigo-600 bg-indigo-600 text-white"
          : "border-zinc-300 text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-400"
      }`}
    >
      {METHOD_LABELS[type]}
    </button>
  );
}

function BankDetailsFields() {
  const bank = useInvoiceStore((s) => s.invoice.paymentMethods.bank);
  const setBankDetails = useInvoiceStore((s) => s.setBankDetails);
  if (!bank) return null;

  return (
    <div className="grid grid-cols-1 gap-4 rounded-md border border-zinc-200 p-4 sm:grid-cols-2 dark:border-zinc-800">
      <Field label="Bank name" htmlFor="bank-name">
        <TextInput
          id="bank-name"
          value={bank.bankName}
          onChange={(e) => setBankDetails({ bankName: e.target.value })}
        />
      </Field>
      <Field label="Account name" htmlFor="account-name">
        <TextInput
          id="account-name"
          value={bank.accountName}
          onChange={(e) => setBankDetails({ accountName: e.target.value })}
        />
      </Field>
      <Field label="Account number" htmlFor="account-number">
        <TextInput
          id="account-number"
          mono
          value={bank.accountNumber}
          onChange={(e) => setBankDetails({ accountNumber: e.target.value })}
        />
      </Field>
      <Field label="Routing / SWIFT (optional)" htmlFor="routing">
        <TextInput
          id="routing"
          mono
          value={bank.routingOrSwift ?? ""}
          onChange={(e) => setBankDetails({ routingOrSwift: e.target.value })}
        />
      </Field>
    </div>
  );
}

function PaymentLinkFields() {
  const link = useInvoiceStore((s) => s.invoice.paymentMethods.link);
  const setPaymentLink = useInvoiceStore((s) => s.setPaymentLink);
  if (!link) return null;

  return (
    <div className="grid grid-cols-1 gap-4 rounded-md border border-zinc-200 p-4 sm:grid-cols-2 dark:border-zinc-800">
      <Field label="Provider" htmlFor="link-provider">
        <TextInput
          id="link-provider"
          value={link.provider}
          onChange={(e) => setPaymentLink({ provider: e.target.value })}
          placeholder="Stripe, Paystack, PayPal.me…"
        />
      </Field>
      <Field label="Link" htmlFor="link-url">
        <TextInput
          id="link-url"
          type="url"
          value={link.url}
          onChange={(e) => setPaymentLink({ url: e.target.value })}
          placeholder="https://"
        />
      </Field>
    </div>
  );
}

function WalletDetailsFields() {
  const wallet = useInvoiceStore((s) => s.invoice.paymentMethods.wallet);
  const setWalletDetails = useInvoiceStore((s) => s.setWalletDetails);
  if (!wallet) return null;

  return (
    <div className="grid grid-cols-1 gap-4 rounded-md border border-zinc-200 p-4 sm:grid-cols-2 dark:border-zinc-800">
      <Field label="Network" htmlFor="wallet-network">
        <select
          id="wallet-network"
          value={wallet.network}
          onChange={(e) =>
            setWalletDetails({ network: e.target.value as WalletNetwork })
          }
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
        >
          {WALLET_NETWORKS.map((n) => (
            <option key={n.value} value={n.value}>
              {n.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Wallet address" htmlFor="wallet-address">
        <TextInput
          id="wallet-address"
          mono
          value={wallet.address}
          onChange={(e) => setWalletDetails({ address: e.target.value })}
        />
      </Field>
      <label className="col-span-full flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
        <input
          type="checkbox"
          checked={wallet.showQrCode}
          onChange={(e) => setWalletDetails({ showQrCode: e.target.checked })}
          className="h-3.5 w-3.5 accent-indigo-600"
        />
        Show QR code on invoice
      </label>
    </div>
  );
}

export function PaymentMethodFields() {
  return (
    <Section
      index="05"
      title="Payment method"
      description="Pick one or more ways the client can pay you."
    >
      <div className="mb-4 flex flex-wrap gap-2">
        <MethodToggle type="bank" />
        <MethodToggle type="link" />
        <MethodToggle type="wallet" />
      </div>
      <div className="flex flex-col gap-4">
        <BankDetailsFields />
        <PaymentLinkFields />
        <WalletDetailsFields />
      </div>
    </Section>
  );
}
