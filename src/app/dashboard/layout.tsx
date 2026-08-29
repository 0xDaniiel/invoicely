// src/app/dashboard/layout.tsx
import Link from "next/link";
import { auth, signOut } from "@/auth";
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
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4 sm:px-8">
          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="font-semibold text-zinc-900 dark:text-zinc-100"
            >
              Invoicely
            </Link>
            <nav className="flex items-center gap-1 text-sm font-medium">
              <Link
                href="/dashboard"
                className="rounded-md px-3 py-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
              >
                History
              </Link>
              <Link
                href="/dashboard/new"
                className="rounded-md px-3 py-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
              >
                New invoice
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-zinc-500 sm:inline">
              {session?.user?.email}
            </span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1 px-6 py-8 sm:px-8">{children}</main>
    </div>
  );
}
