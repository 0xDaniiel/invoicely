// components/invoice-form/FormPrimitives.tsx
import {
  InputHTMLAttributes,
  // LabelHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

// Shared visual language for the invoice form:
// - section = a numbered ledger entry (business, client, items, terms, payment)
// - mono type for anything numeric/monetary, sans for everything else
// - single accent (indigo-600) reserved for focus rings and primary actions

export function Section({
  index,
  title,
  description,
  children,
}: {
  index: string; // "01", "02"... — a real sequence, invoice sections are filled in order
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-zinc-200 py-8 first:border-t-0 first:pt-0 dark:border-zinc-800">
      <div className="mb-5 flex items-baseline gap-3">
        <span className="font-mono text-xs tabular-nums text-zinc-400 dark:text-zinc-600">
          {index}
        </span>
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">
            {title}
          </h2>
          {description && (
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-500">
              {description}
            </p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

export function Field({
  label,
  htmlFor,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
} & { children: ReactNode }) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const baseInputClasses =
  "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100";

export function TextInput({
  mono = false,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { mono?: boolean }) {
  return (
    <input
      className={`${baseInputClasses} ${mono ? "font-mono tabular-nums" : ""} ${className}`}
      {...props}
    />
  );
}

export function TextArea({
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`${baseInputClasses} resize-none ${className}`}
      {...props}
    />
  );
}

export function IconButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1 text-xs font-medium text-zinc-500 transition-colors hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40 dark:text-zinc-400 dark:hover:text-indigo-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
