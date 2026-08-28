import { InvoiceWorkspace } from "@/components/invoice-preview/InvoiceWorkspace";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-8 sm:px-8">
        <header className="mb-8">
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            New invoice
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
            Fill in the details below, then tap Preview to see the exact PDF
            you&apos;ll download.
          </p>
        </header>
        <InvoiceWorkspace />
      </main>
    </div>
  );
}
