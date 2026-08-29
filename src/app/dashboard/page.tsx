// src/app/dashboard/page.tsx
import { auth, signOut } from "@/auth";

export default async function DashboardPage() {
  // Middleware already guarantees a session exists for this route, but
  // `auth()` is called here too to read the actual session data — the
  // matcher only gates access, it doesn't pass session data through.
  const session = await auth();

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Dashboard
          </h1>
          <p className="text-sm text-zinc-500">
            Signed in as {session?.user?.email}
          </p>
        </div>
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
      {/* TODO (step 6): list past invoices here, fetched via prisma.invoice.findMany({ where: { userId: session.user.id } }) */}
      <p className="text-sm text-zinc-500">Invoice history coming next.</p>
    </div>
  );
}
