import { InvoiceWorkspace } from "@/components/invoice-preview/InvoiceWorkspace";

export default function NewInvoicePage() {
  return (
    <div>
      <header className="mx-auto mb-8 w-full max-w-2xl">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          New invoice
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
          Fill in the details below, then tap Preview to see the exact PDF
          you&apos;ll download.
        </p>
      </header>
      <InvoiceWorkspace />
    </div>
  );
}
