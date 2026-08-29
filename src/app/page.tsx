// TODO (step 8): replace with the real marketing landing page
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 text-center dark:bg-black">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        Invoicely
      </h1>
      <p className="mt-2 max-w-sm text-sm text-zinc-500">
        Create and send invoices with flexible payment methods — bank transfer,
        payment links, or crypto.
      </p>
      <Link
        href="/login"
        className="mt-6 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
      >
        Get started
      </Link>
    </div>
  );
}
