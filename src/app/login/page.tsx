// src/app/login/page.tsx
import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-sm rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="mb-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Sign in to Invoicely
        </h1>
        <p className="mb-6 text-sm text-zinc-500">
          Access your invoice history and dashboard.
        </p>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/dashboard" });
          }}
        >
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-3 rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5Z"
              />
              <path
                fill="#FF3D00"
                d="m6.3 14.7 6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.4 0-13.8 4.1-17.1 10.2Z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.4C29.5 35.4 26.9 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.6 5.1C9.9 39.8 16.4 44 24 44Z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.5l6.6 5.4C41.4 36.2 44 30.6 44 24c0-1.2-.1-2.4-.4-3.5Z"
              />
            </svg>
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
}
