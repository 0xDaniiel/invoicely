import type { Metadata } from "next";
import { auth } from "@/auth";
import { SessionProvider } from "@/components/providers/SessionProvider";
import "./globals.css";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

const fontSans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

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
      className={`${fontSans.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
