// src/components/landing/GetStartedSection.tsx
import { QrCode } from "lucide-react";
import { GoogleSignInButton } from "./GoogleSignInButton";

export function GetStartedSection() {
  return (
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
          Create a professional invoice, add the payment method your client
          prefers, and get back to the work that matters.
        </p>
        <div className="mt-8 flex justify-center">
          <GoogleSignInButton label="Get started with Google" />
        </div>
      </div>
    </section>
  );
}
