// src/components/invoice-preview/AutosaveIndicator.tsx
import type { AutosaveStatus } from "@/hooks/useAutosaveInvoice";

export function AutosaveIndicator({
  status,
  error,
}: {
  status: AutosaveStatus;
  error: string | null;
}) {
  if (status === "idle") return null;

  return (
    <p className="mr-auto self-center text-xs text-zinc-500">
      {status === "saving" && "Saving…"}
      {status === "saved" && "Saved"}
      {status === "error" && (
        <span className="text-red-600 dark:text-red-400">
          {error ?? "Autosave failed"}
        </span>
      )}
    </p>
  );
}
