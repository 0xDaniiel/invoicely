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
  title: "Get Paid Your Way",
  description:
    "Create polished invoices in minutes and get paid by bank transfer, payment link, or crypto. Free invoicing built for freelancers and independent businesses.",
  openGraph: {
    title: "Invoicely: Get Paid Your Way",
    description:
      "Create polished invoices and get paid by bank transfer, payment link, or crypto.",
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
