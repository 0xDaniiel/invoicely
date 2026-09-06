// src/components/landing/Hero.tsx
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { InvoicePreview } from "./InvoicePreview";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-190 bg-surface pt-32 lg:min-h-205 lg:pt-40"
    >
      <div className="absolute inset-x-0 bottom-0 h-32 bg-background [clip-path:polygon(0_78%,100%_0,100%_100%,0_100%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 pb-36 sm:px-8 lg:grid-cols-[1fr_.92fr] lg:gap-20">
        <div className="max-w-2xl animate-fade-in">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-semibold text-secondary-foreground">
            Invoicing that feels effortless
          </div>
          <h1 className="font-display text-5xl font-extrabold leading-[1.06] sm:text-6xl lg:text-7xl">
            Get paid, however{" "}
            <span className="text-primary">you&apos;re paid.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
            One clean invoice for every way you work. Add bank transfer, payment
            links, or crypto, then send a polished PDF in minutes.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <GoogleSignInButton label="Start free with Google" />
            <Button asChild variant="outline" size="lg">
              <a href="#how-it-works">See how it works</a>
            </Button>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="size-4 text-primary" /> No card required · Free
            forever
          </p>
        </div>
        <InvoicePreview />
      </div>
    </section>
  );
}
