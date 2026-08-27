// components/invoice-form/LineItemsFields.tsx
"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import {
  calculateLineItemAmount,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
} from "@/types/invoice";
import { IconButton, Section, TextInput } from "./FormPrimitives";

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  }).format(amount);
}

export function LineItemsFields() {
  const lineItems = useInvoiceStore((s) => s.invoice.lineItems);
  const currency = useInvoiceStore((s) => s.invoice.currency);
  const taxRate = useInvoiceStore((s) => s.invoice.taxRate);
  const addLineItem = useInvoiceStore((s) => s.addLineItem);
  const updateLineItem = useInvoiceStore((s) => s.updateLineItem);
  const removeLineItem = useInvoiceStore((s) => s.removeLineItem);

  const subtotal = calculateSubtotal(lineItems);
  const tax = calculateTax(subtotal, taxRate);
  const total = calculateTotal(lineItems, taxRate);

  return (
    <Section
      index="03"
      title="Line items"
      description="What you're billing for."
    >
      {/* header row — hidden on mobile, columns collapse to stacked fields */}
      <div className="mb-2 hidden grid-cols-[1fr_80px_110px_110px_28px] gap-3 px-1 text-xs font-medium text-zinc-500 sm:grid dark:text-zinc-500">
        <span>Description</span>
        <span>Qty</span>
        <span>Rate</span>
        <span className="text-right">Amount</span>
        <span />
      </div>

      <div className="flex flex-col gap-2">
        {lineItems.map((item) => {
          const amount = calculateLineItemAmount(item);
          return (
            <div
              key={item.id}
              className="grid grid-cols-1 gap-2 rounded-md border border-zinc-200 p-3 sm:grid-cols-[1fr_80px_110px_110px_28px] sm:items-center sm:border-0 sm:p-0 dark:border-zinc-800"
            >
              <TextInput
                aria-label="Description"
                value={item.description}
                onChange={(e) =>
                  updateLineItem(item.id, { description: e.target.value })
                }
                placeholder="Design & development work"
              />
              <TextInput
                aria-label="Quantity"
                type="number"
                min={0}
                mono
                value={item.quantity}
                onChange={(e) =>
                  updateLineItem(item.id, { quantity: Number(e.target.value) })
                }
              />
              <TextInput
                aria-label="Rate"
                type="number"
                min={0}
                mono
                value={item.rate}
                onChange={(e) =>
                  updateLineItem(item.id, { rate: Number(e.target.value) })
                }
              />
              <div className="text-right font-mono text-sm tabular-nums text-zinc-700 dark:text-zinc-300">
                {formatAmount(amount, currency)}
              </div>
              <IconButton
                onClick={() => removeLineItem(item.id)}
                disabled={lineItems.length === 1}
                aria-label="Remove line item"
                className="justify-self-end"
              >
                ✕
              </IconButton>
            </div>
          );
        })}
      </div>

      <IconButton onClick={addLineItem} className="mt-3">
        + Add line item
      </IconButton>

      <div className="mt-6 ml-auto flex w-full max-w-[260px] flex-col gap-1.5 text-sm">
        <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
          <span>Subtotal</span>
          <span className="font-mono tabular-nums">
            {formatAmount(subtotal, currency)}
          </span>
        </div>
        <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
          <span>Tax ({taxRate || 0}%)</span>
          <span className="font-mono tabular-nums">
            {formatAmount(tax, currency)}
          </span>
        </div>
        <div className="flex justify-between border-t border-zinc-200 pt-1.5 font-semibold text-zinc-900 dark:border-zinc-800 dark:text-zinc-100">
          <span>Total</span>
          <span className="font-mono tabular-nums">
            {formatAmount(total, currency)}
          </span>
        </div>
      </div>
    </Section>
  );
}
