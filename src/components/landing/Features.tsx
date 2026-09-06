// src/components/landing/Features.tsx
import { CircleDollarSign, FileCheck2, Zap } from "lucide-react";

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

export function Features() {
  return (
    <section id="features" className="scroll-mt-12 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase text-primary">
            Built for independent work
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-5xl">
            Everything you need.
            <br />
            Nothing you don&apos;t.
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
  );
}
