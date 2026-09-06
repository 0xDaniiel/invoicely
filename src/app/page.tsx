// src/app/page.tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { GetStartedSection } from "@/components/landing/GetStartedSection";
import { SiteFooter } from "@/components/landing/SiteFooter";

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

export default async function Page() {
  // Already-signed-in visitors go straight to the dashboard rather than
  // seeing the marketing page again.
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <SiteHeader />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <GetStartedSection />
      <SiteFooter />
    </main>
  );
}
