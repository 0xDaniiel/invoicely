// src/app/dashboard/layout.tsx
import Link from "next/link";
import { auth } from "@/auth";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { UserMenu } from "@/components/dashboard/UserMenu";
import type { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Middleware already guarantees a session exists for anything under
  // /dashboard — this call reads the actual data (the matcher only gates
  // access, it doesn't pass session data through).
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4 sm:px-8">
          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-display text-xl font-extrabold text-zinc-900 dark:text-zinc-100"
            >
              Invoicely
              <span className="text-primary">.</span>
            </Link>
            <DashboardNav />
          </div>
          <UserMenu email={session?.user?.email} image={session?.user?.image} />
        </div>
      </header>
      <main className="flex-1 px-6 py-8 sm:px-8">{children}</main>
    </div>
  );
}
