// src/hooks/useAutosaveInvoice.ts
"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import type { Invoice } from "@/types/invoice";
import { createInvoice, updateInvoice } from "@/app/actions/invoice";

export type AutosaveStatus = "idle" | "saving" | "saved" | "error";

const AUTOSAVE_DELAY_MS = 2000;

/**
 * Debounced autosave for the invoice form. Skips entirely while signed out
 * or before a client name exists (the one required field — see
 * src/lib/validations/invoice.ts — so there's nothing worth persisting
 * before then). The first successful save creates the row and reports the
 * new id back via onSaved; every save after that updates the same row.
 *
 * Also flushes immediately on unmount: without this, navigating away
 * (e.g. hitting back) inside the debounce window would silently discard
 * whatever hadn't been saved yet.
 */
export function useAutosaveInvoice(
  invoice: Invoice,
  currentId: string | undefined,
  onSaved: (id: string) => void,
) {
  const { status: sessionStatus } = useSession();
  const [status, setStatus] = useState<AutosaveStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Read inside the save function via refs rather than raw props/state, so
  // a save already in flight — or a flush on unmount — always uses the
  // latest values, not whatever they were when the effect first ran.
  const currentIdRef = useRef(currentId);
  const invoiceRef = useRef(invoice);
  const onSavedRef = useRef(onSaved);

  useEffect(() => {
    currentIdRef.current = currentId;
    invoiceRef.current = invoice;
    onSavedRef.current = onSaved;
  }, [currentId, invoice, onSaved]);

  async function performSave() {
    setStatus("saving");
    setError(null);

    const current = invoiceRef.current;
    const payload = {
      business: current.business,
      client: current.client,
      lineItems: current.lineItems,
      taxRate: current.taxRate,
      currency: current.currency,
      dueDate: current.dueDate,
      notes: current.notes,
      paymentMethods: current.paymentMethods,
    };

    const result = currentIdRef.current
      ? await updateInvoice(currentIdRef.current, payload)
      : await createInvoice(payload);

    if (!result.success) {
      setStatus("error");
      setError(result.error);
      return;
    }

    setStatus("saved");
    // Only createInvoice's result carries a new id — updateInvoice already
    // knows which row it touched. The `in` check keeps this safe regardless
    // of updateInvoice's exact return shape.
    if (!currentIdRef.current && "invoiceId" in result) {
      onSavedRef.current(result.invoiceId as string);
    }
  }

  useEffect(() => {
    if (sessionStatus !== "authenticated" || !invoice.client.name.trim()) {
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      performSave();
    }, AUTOSAVE_DELAY_MS);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // Intentionally keyed on the whole serialized invoice — any field
    // change should reset the debounce timer, not just specific ones.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(invoice), sessionStatus]);

  // Flush on unmount: if a debounced save was still pending when this
  // component goes away (route change, back button), fire it immediately
  // instead of letting the change above discard it.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
        performSave();
      }
    };
  }, []);

  return { status, error };
}
