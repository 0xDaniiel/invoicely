// components/invoice-form/InvoiceMetaFields.tsx
"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { Field, Section, TextArea, TextInput } from "./FormPrimitives";

// TODO: replace with a real currency list (or a searchable combobox) before launch
const CURRENCIES = ["USD", "EUR", "GBP", "NGN", "GHS", "KES", "ZAR"];

export function InvoiceMetaFields() {
  const { taxRate, currency, dueDate, notes } = useInvoiceStore(
    (s) => s.invoice,
  );
  const setTaxRate = useInvoiceStore((s) => s.setTaxRate);
  const setCurrency = useInvoiceStore((s) => s.setCurrency);
  const setDueDate = useInvoiceStore((s) => s.setDueDate);
  const setNotes = useInvoiceStore((s) => s.setNotes);

  return (
    <Section
      index="04"
      title="Terms"
      description="Currency, tax, due date, and any notes for the client."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Currency" htmlFor="currency">
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Tax rate (%)" htmlFor="tax-rate">
          <TextInput
            id="tax-rate"
            type="number"
            min={0}
            mono
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value))}
          />
        </Field>
        <Field label="Due date" htmlFor="due-date">
          <TextInput
            id="due-date"
            type="date"
            mono
            value={dueDate ?? ""}
            onChange={(e) => setDueDate(e.target.value || null)}
          />
        </Field>
        <Field label="Notes" htmlFor="notes" className="sm:col-span-3">
          <TextArea
            id="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Thank you for your business — payment due within 14 days."
          />
        </Field>
      </div>
    </Section>
  );
}
