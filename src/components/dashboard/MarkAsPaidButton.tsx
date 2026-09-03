// src/components/dashboard/MarkAsPaidButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircleCheck, Loader2 } from "lucide-react";
import { markInvoiceAsPaid } from "@/app/actions/invoice";

export function MarkAsPaidButton({ invoiceId }: { invoiceId: string }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  async function handleClick() {
    setIsSaving(true);
    const result = await markInvoiceAsPaid(invoiceId);
    if (!result.success) {
      setIsSaving(false);
      window.alert(result.error);
      return;
    }
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isSaving}
      title="Mark as paid"
      aria-label="Mark invoice as paid"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-emerald-50 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-500 dark:hover:bg-emerald-950 dark:hover:text-emerald-400"
    >
      {isSaving ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <CircleCheck size={16} />
      )}
    </button>
  );
}
