// src/components/landing/SiteFooter.tsx
export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-display font-bold text-foreground">
          Invoicely<span className="text-primary">.</span>
        </p>
        <p>Simple invoicing for independent work.</p>
      </div>
    </footer>
  );
}
