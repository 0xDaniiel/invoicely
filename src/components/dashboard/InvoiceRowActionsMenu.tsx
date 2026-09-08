// src/components/dashboard/InvoiceRowActionsMenu.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MoreVertical,
  Eye,
  Pencil,
  Copy,
  CircleCheck,
  Trash2,
  Loader2,
} from "lucide-react";
import type { InvoiceRecord } from "@/types/invoice";
import {
  duplicateInvoice,
  markInvoiceAsPaid,
  deleteInvoice,
} from "@/app/actions/invoice";
import { DownloadPdfButton } from "@/components/invoice-preview/DownloadPdfButton";
import { DeleteInvoiceDialog } from "./DeleteInvoiceDialog";

interface InvoiceRowActionsMenuProps {
  invoice: InvoiceRecord;
  walletQrCodeDataUrl: string | null;
  onView: () => void;
}

const itemClass =
  "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm text-zinc-700 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-300 dark:hover:bg-zinc-800";

export function InvoiceRowActionsMenu({
  invoice,
  walletQrCodeDataUrl,
  onView,
}: InvoiceRowActionsMenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDuplicating, setIsDuplicating] = useState(false);
  const [isMarkingPaid, setIsMarkingPaid] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  async function handleDuplicate() {
    setIsDuplicating(true);
    const result = await duplicateInvoice(invoice.id);
    if (!result.success) {
      setIsDuplicating(false);
      window.alert(result.error);
      return;
    }
    router.push(`/dashboard/edit/${result.invoiceId}`);
  }

  async function handleMarkAsPaid() {
    setIsMarkingPaid(true);
    const result = await markInvoiceAsPaid(invoice.id);
    setIsMarkingPaid(false);
    if (!result.success) {
      window.alert(result.error);
      return;
    }
    setIsOpen(false);
    router.refresh();
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        title="More actions"
        aria-label="More actions"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 z-10 mt-1 w-48 rounded-md border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setIsOpen(false);
              onView();
            }}
            className={itemClass}
          >
            <Eye size={16} /> View
          </button>
          <Link
            href={`/dashboard/edit/${invoice.id}`}
            role="menuitem"
            className={itemClass}
          >
            <Pencil size={16} /> Edit
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={handleDuplicate}
            disabled={isDuplicating}
            className={itemClass}
          >
            {isDuplicating ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Copy size={16} />
            )}{" "}
            Duplicate
          </button>
          <DownloadPdfButton
            invoice={invoice}
            walletQrCodeDataUrl={walletQrCodeDataUrl}
            invoiceId={invoice.id}
            variant="menuItem"
          />
          {invoice.status !== "PAID" && (
            <button
              type="button"
              role="menuitem"
              onClick={handleMarkAsPaid}
              disabled={isMarkingPaid}
              className={itemClass}
            >
              {isMarkingPaid ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <CircleCheck size={16} />
              )}{" "}
              Mark as paid
            </button>
          )}
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setIsOpen(false);
              setDeleteDialogOpen(true);
            }}
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      )}

      {isDeleteDialogOpen && (
        <DeleteInvoiceDialog
          clientLabel={invoice.client.name || "this invoice"}
          onConfirm={() => deleteInvoice(invoice.id)}
          onDeleted={() => router.refresh()}
          onClose={() => setDeleteDialogOpen(false)}
        />
      )}
    </div>
  );
}
