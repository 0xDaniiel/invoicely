// src/components/landing/HowItWorks.tsx
const steps = [
  [
    "01",
    "Add the details",
    "Choose a client, add your line items, and set a due date.",
  ],
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
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-12 bg-foreground py-24 text-primary-foreground sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="text-sm font-bold uppercase text-success">
              From blank to paid
            </p>
            <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
              Three steps.
              <br />
              Zero friction.
            </h2>
          </div>
          <ol className="divide-y divide-primary-foreground/15">
            {steps.map(([n, t, c]) => (
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
  );
}
