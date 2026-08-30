// src/components/invoice-preview/EditInvoiceLoader.tsx
"use client";

import { useEffect } from "react";
import type { Invoice } from "@/types/invoice";
import { useInvoiceStore } from "@/store/useInvoiceStore";

export function EditInvoiceLoader({ invoice }: { invoice: Invoice }) {
  const loadInvoice = useInvoiceStore((s) => s.loadInvoice);
  useEffect(() => {
    loadInvoice(invoice);
    // Only load once on mount — the store becomes the source of truth for
    // the form after this, not the server-fetched prop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
