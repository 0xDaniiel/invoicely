// src/hooks/useWalletQrCode.ts
import { useEffect, useState } from "react";
import { generateWalletQrCode } from "@/lib/generateWalletQrCode";
import type { WalletDetails } from "@/types/invoice";

export function useWalletQrCode(wallet?: WalletDetails) {
  // Only ever holds the result of an actual async generation, tagged with the
  // address it was generated for — never reset synchronously from the effect.
  const [generated, setGenerated] = useState<{
    address: string;
    dataUrl: string | null;
  } | null>(null);

  useEffect(() => {
    if (!wallet?.showQrCode || !wallet.address) return;
    let cancelled = false;
    const address = wallet.address;
    generateWalletQrCode(address).then((dataUrl) => {
      if (!cancelled) setGenerated({ address, dataUrl });
    });
    return () => {
      cancelled = true;
    };
  }, [wallet?.address, wallet?.showQrCode]);

  // Derived at read time: if QR is off, there's no address, or the last
  // generated result belongs to a stale address, treat it as "no QR yet"
  // instead of reaching for a synchronous setState reset.
  if (
    !wallet?.showQrCode ||
    !wallet.address ||
    generated?.address !== wallet.address
  ) {
    return null;
  }
  return generated.dataUrl;
}
