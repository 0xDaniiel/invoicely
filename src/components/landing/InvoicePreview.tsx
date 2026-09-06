// src/components/landing/InvoicePreview.tsx
import { Check, Link2 } from "lucide-react";

export function InvoicePreview() {
  return (
    <div className="relative mx-auto w-full max-w-125 animate-invoice">
      <div className="absolute -left-6 top-20 hidden items-center gap-2 rounded-md border bg-background px-3 py-2 text-xs font-medium shadow-lg sm:flex animate-float">
        <span className="grid size-6 place-items-center rounded-full bg-secondary text-primary">
          <Check className="size-3.5" />
        </span>
        Ready to send
      </div>
      <div className="rotate-1 rounded-lg border bg-card p-6 shadow-2xl sm:p-9">
        <div className="mb-10 flex items-start justify-between">
          <div>
            <p className="font-display text-lg font-extrabold">
              Aestrix Studio
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              hello@aestrix.dev
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl font-bold">Invoice</p>
            <p className="mt-1 text-xs text-muted-foreground">#0231</p>
          </div>
        </div>
        <div className="space-y-4 border-y py-5 text-sm">
          <div className="flex justify-between gap-4">
            <span>Brand identity design</span>
            <strong>$600.00</strong>
          </div>
          <div className="flex justify-between gap-4">
            <span>Landing page build</span>
            <strong>$260.00</strong>
          </div>
        </div>
        <div className="flex items-end justify-between py-6">
          <div>
            <p className="text-xs text-muted-foreground">Total due</p>
            <p className="mt-1 font-display text-3xl font-extrabold">$860.00</p>
          </div>
          <div
            className="grid grid-cols-5 gap-1 rounded-md border p-2"
            aria-label="Payment QR code"
          >
            {Array.from({ length: 25 }).map((_, i) => (
              <span
                key={i}
                className={`size-1.5 rounded-[1px] ${
                  [
                    0, 1, 2, 5, 7, 10, 11, 12, 14, 17, 19, 20, 22, 23, 24,
                  ].includes(i)
                    ? "bg-foreground"
                    : "bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-surface px-4 py-3 text-xs font-medium text-secondary-foreground">
          <Link2 className="size-4 text-primary" /> Pay securely with your
          preferred method
        </div>
      </div>
    </div>
  );
}
