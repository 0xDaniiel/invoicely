// src/components/landing/SiteHeader.tsx
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Main navigation"
      >
        <a href="#top" className="font-display text-xl font-extrabold">
          Invoicely<span className="text-primary">.</span>
        </a>
        <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a
            href="#features"
            className="transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="transition-colors hover:text-foreground"
          >
            How it works
          </a>
          <a
            href="#pricing"
            className="transition-colors hover:text-foreground"
          >
            Pricing
          </a>
        </div>
        <Button asChild size="lg">
          <a href="#get-started">
            Create an invoice <ArrowRight />
          </a>
        </Button>
      </nav>
    </header>
  );
}
