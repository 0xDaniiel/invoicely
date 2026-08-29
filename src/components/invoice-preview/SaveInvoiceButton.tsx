// src/components/invoice-preview/SaveInvoiceButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import type { Invoice } from "@/types/invoice";
import { createInvoice } from "@/app/actions/invoice";
import Link from "next/link";

export function SaveInvoiceButton({ invoice }: { invoice: Invoice }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Signed-out visitors see a sign-in prompt instead of a broken Save button —
  // the server action independently re-checks the session too, so this is a
  // UX convenience, not the actual security boundary.
  if (status !== "loading" && !session) {
    return (
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
      >
        Sign in to save
      </Link>
    );
  }

  async function handleSave() {
    setIsSaving(true);
    setError(null);
    const result = await createInvoice({
      business: invoice.business,
      client: invoice.client,
      lineItems: invoice.lineItems,
      taxRate: invoice.taxRate,
      currency: invoice.currency,
      dueDate: invoice.dueDate,
      notes: invoice.notes,
      paymentMethods: invoice.paymentMethods,
    });
    setIsSaving(false);

    if (!result.success) {
      setError(result.error);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      <button
        type="button"
        onClick={handleSave}
        disabled={isSaving || status === "loading"}
        className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
      >
        {isSaving ? "Saving…" : "Save invoice"}
      </button>
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
