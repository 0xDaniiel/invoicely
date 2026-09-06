import type { Metadata } from "next";
import { auth } from "@/auth";
import { SessionProvider } from "@/components/providers/SessionProvider";
import "./globals.css";
import { Space_Grotesk, JetBrains_Mono, Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Invoicely",
  description: "Create and send invoices with flexible payment methods.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await auth();
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
