import type { Metadata } from "next";
import { auth } from "@/auth";
import { SessionProvider } from "@/components/providers/SessionProvider";
import "./globals.css";
import { JetBrains_Mono, Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://invoicely-nine-beige.vercel.app"),
  title: {
    default: "Invoicely: Simple Invoicing for Freelancers",
    template: "%s • Invoicely",
  },
  icons: {
    icon: "/images/icon.png",
  },
  description:
    "Create polished invoices in minutes and get paid by bank transfer, payment link, or crypto. Free invoicing built for freelancers and independent businesses.",
  keywords: [
    "invoicing software",
    "free invoice generator",
    "freelance invoicing",
    "invoice PDF",
    "crypto invoice",
  ],
  openGraph: {
    title: "Invoicely: Simple Invoicing for Freelancers",
    description:
      "Create polished invoices and get paid by bank transfer, payment link, or crypto.",
    siteName: "Invoicely",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoicely: Simple Invoicing for Freelancers",
    description:
      "Create polished invoices and get paid by bank transfer, payment link, or crypto.",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await auth();
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
