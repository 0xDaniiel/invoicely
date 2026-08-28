// src/lib/generateWalletQrCode.ts
import QRCode from "qrcode";

// Generates a data URL so it can be dropped straight into a react-pdf <Image>.
// Kept as a plain async fn (not a hook) so it's easy to call from either
// the preview or a future server-side PDF generation path.
export async function generateWalletQrCode(
  address: string,
): Promise<string | null> {
  if (!address) return null;
  try {
    return await QRCode.toDataURL(address, { margin: 1, width: 200 });
  } catch {
    return null;
  }
}
