// app/page.tsx — Invoicely landing page (Next.js App Router version)
// Works as a React Server Component — no "use client" needed.
import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  CircleDollarSign,
  FileCheck2,
  Link2,
  QrCode,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Invoicely — Get paid your way",
  description:
    "Create polished invoices with bank transfer, payment links, or crypto. Free, fast, and built for independent work.",
  openGraph: {
    title: "Invoicely — Get paid your way",
    description: "Flexible, polished invoicing for independent work.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const features = [
  {
    icon: CircleDollarSign,
    title: "Get paid your way",
    copy: "Add bank details, a secure payment link, or a crypto QR code to every invoice.",
  },
  {
    icon: FileCheck2,
    title: "Pixel-perfect PDFs",
    copy: "Preview the final document as you type. What you see is exactly what your client receives.",
  },
  {
    icon: Zap,
    title: "Ready in minutes",
    copy: "Save client details, duplicate past invoices, and send polished work without the admin drag.",
  },
];

function GoogleMark() {
  return (
    <span
      className="grid size-5 place-items-center rounded-full bg-background text-xs font-bold text-foreground"
      aria-hidden="true"
    >
      G
    </span>
  );
}

function InvoicePreview() {
  return (
    <div className="relative mx-auto w-full max-w-[500px] animate-invoice">
      <div className="absolute -left-6 top-20 hidden items-center gap-2 rounded-md border bg-background px-3 py-2 text-xs font-medium shadow-lg sm:flex animate-float">
        <span className="grid size-6 place-items-center rounded-full bg-secondary text-primary">
          <Check className="size-3.5" />
        </span>
        Ready to send
      </div>
      <div className="rotate-1 rounded-lg border bg-card p-6 shadow-2xl sm:p-9">
        <div className="mb-10 flex items-start justify-between">
          <div>
            <p className="font-display text-lg font-extrabold">Aestrix Studio</p>
            <p className="mt-1 text-xs text-muted-foreground">hello@aestrix.dev</p>
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
          <div className="grid grid-cols-5 gap-1 rounded-md border p-2" aria-label="Payment QR code">
            {Array.from({ length: 25 }).map((_, i) => (
              <span
                key={i}
                className={`size-1.5 rounded-[1px] ${
                  [0, 1, 2, 5, 7, 10, 11, 12, 14, 17, 19, 20, 22, 23, 24].includes(i)
                    ? "bg-foreground"
                    : "bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-surface px-4 py-3 text-xs font-medium text-secondary-foreground">
          <Link2 className="size-4 text-primary" /> Pay securely with your preferred method
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <header className="absolute inset-x-0 top-0 z-20">
        <nav
          className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
          aria-label="Main navigation"
        >
          <a href="#top" className="font-display text-xl font-extrabold">
            Invoicely<span className="text-primary">.</span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-foreground">
              How it works
            </a>
            <a href="#pricing" className="transition-colors hover:text-foreground">
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

      <section id="top" className="relative min-h-[760px] bg-surface pt-32 lg:min-h-[820px] lg:pt-40">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-background [clip-path:polygon(0_78%,100%_0,100%_100%,0_100%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 pb-36 sm:px-8 lg:grid-cols-[1fr_.92fr] lg:gap-20">
          <div className="max-w-2xl animate-fade-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-semibold text-secondary-foreground">
              <Sparkles className="size-3.5 text-primary" /> Invoicing that feels effortless
            </div>
            <h1 className="font-display text-5xl font-extrabold leading-[1.06] sm:text-6xl lg:text-7xl">
              Get paid, however <span className="text-primary">you’re paid.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
              One clean invoice for every way you work. Add bank transfer, payment links, or
              crypto—then send a polished PDF in minutes.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="hero" size="lg">
                <a href="#get-started">
                  <GoogleMark /> Start free with Google <ArrowRight />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#how-it-works">See how it works</a>
              </Button>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="size-4 text-primary" /> No card required · Free forever
            </p>
          </div>
          <InvoicePreview />
        </div>
      </section>

      <section id="features" className="scroll-mt-12 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase text-primary">Built for independent work</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-5xl">
              Everything you need.
              <br />
              Nothing you don’t.
            </h2>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-3">
            {features.map(({ icon: Icon, title, copy }) => (
              <article
                key={title}
                className="group bg-background p-8 transition-colors hover:bg-surface sm:p-10"
              >
                <div className="grid size-11 place-items-center rounded-md bg-secondary text-primary transition-transform group-hover:-translate-y-1">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-8 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-12 bg-foreground py-24 text-primary-foreground sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-sm font-bold uppercase text-success">From blank to paid</p>
              <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
                Three steps.
                <br />
                Zero friction.
              </h2>
            </div>
            <ol className="divide-y divide-primary-foreground/15">
              {[
                ["01", "Add the details", "Choose a client, add your line items, and set a due date."],
                [
                  "02",
                  "Pick how you get paid",
                  "Add bank details, a payment link, or generate a crypto QR code.",
                ],
                [
                  "03",
                  "Preview and send",
                  "Review the live PDF, download it, and send it with confidence.",
                ],
              ].map(([n, t, c]) => (
                <li
                  key={n}
                  className="grid gap-3 py-7 first:pt-0 sm:grid-cols-[48px_1fr_1.4fr] sm:items-baseline"
                >
                  <span className="text-sm font-bold text-success">{n}</span>
                  <h3 className="text-lg font-bold">{t}</h3>
                  <p className="leading-7 text-primary-foreground/65">{c}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-12 border-b py-20 text-center">
        <p className="font-display text-2xl font-extrabold sm:text-3xl">
          No subscriptions. No invoice fees. <span className="text-primary">Just free.</span>
        </p>
      </section>

      <section id="get-started" className="scroll-mt-12 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <div className="mx-auto grid size-14 place-items-center rounded-lg bg-secondary text-primary">
            <QrCode className="size-7" />
          </div>
          <h2 className="mt-7 text-4xl font-extrabold sm:text-5xl">
            Your next invoice is
            <br />
            five minutes away.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Create a professional invoice, add the payment method your client prefers, and get back
            to the work that matters.
          </p>
          <Button className="mt-8" variant="hero" size="lg">
            <GoogleMark /> Get started with Google <ArrowRight />
          </Button>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="font-display font-bold text-foreground">
            Invoicely<span className="text-primary">.</span>
          </p>
          <p>Simple invoicing for independent work.</p>
        </div>
      </footer>
    </main>
  );
}
