// src/components/invoice-preview/PdfFrame.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePDF } from "@react-pdf/renderer";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import type { Invoice } from "@/types/invoice";
import { InvoiceDocument } from "@/components/invoice-pdf/InvoiceDocument";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url,
// ).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfFrameProps {
  invoice: Invoice;
  walletQrCodeDataUrl: string | null;
}

export function PdfFrame({ invoice, walletQrCodeDataUrl }: PdfFrameProps) {
  const invoiceKey = JSON.stringify(invoice);
  const document = useMemo(
    () => (
      <InvoiceDocument
        invoice={invoice}
        walletQrCodeDataUrl={walletQrCodeDataUrl}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [invoiceKey, walletQrCodeDataUrl],
  );

  const [instance, updateInstance] = usePDF({ document });

  useEffect(() => {
    updateInstance(document);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const observer = new ResizeObserver((entries) =>
      setWidth(entries[0].contentRect.width),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (instance.loading || !instance.url) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-zinc-400">
        Loading preview…
      </div>
    );
  }

  if (instance.error) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-red-500">
        Couldn&apos;t load preview.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-x-hidden overflow-y-auto bg-zinc-100 dark:bg-zinc-900 [&_canvas]:!h-auto [&_canvas]:!max-w-full"
    >
      <Document
        file={instance.url}
        loading=""
        className="flex justify-center py-4"
      >
        <Page
          pageNumber={1}
          width={width ? Math.min(width - 32, 700) : undefined}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
}
