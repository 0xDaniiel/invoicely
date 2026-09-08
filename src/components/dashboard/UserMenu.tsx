// src/components/dashboard/UserMenu.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";

export function UserMenu({
  email,
  image,
}: {
  email?: string | null;
  image?: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setIsOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const initial = email?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-medium text-primary-foreground"
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="h-full w-full object-cover" />
        ) : (
          initial
        )}
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 z-10 mt-2 w-56 rounded-md border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <p className="truncate px-3 py-2 text-sm text-zinc-500">{email}</p>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
