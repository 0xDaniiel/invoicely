// src/components/dashboard/PaginationControls.tsx
import Link from "next/link";

export function PaginationControls({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);
  const disabledClass = "pointer-events-none text-zinc-300 dark:text-zinc-700";
  const enabledClass =
    "text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400";

  return (
    <div className="mt-6 flex items-center justify-between">
      <Link
        href={`/dashboard?page=${prevPage}`}
        aria-disabled={currentPage === 1}
        className={`text-sm font-medium ${currentPage === 1 ? disabledClass : enabledClass}`}
      >
        Previous
      </Link>
      <span className="text-sm text-zinc-500">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={`/dashboard?page=${nextPage}`}
        aria-disabled={currentPage === totalPages}
        className={`text-sm font-medium ${currentPage === totalPages ? disabledClass : enabledClass}`}
      >
        Next
      </Link>
    </div>
  );
}
