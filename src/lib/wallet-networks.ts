// src/lib/wallet-networks.ts

// The full list of network values, kept as its own const tuple so Zod can
// use it directly (z.enum needs a literal tuple, not a derived string[]).
export const WALLET_NETWORK_VALUES = [
  "bitcoin",
  "ethereum",
  "solana",
  "polygon",
  "bsc",
  "tron",
] as const;

export type WalletNetwork = (typeof WALLET_NETWORK_VALUES)[number];

export const WALLET_NETWORKS: { value: WalletNetwork; label: string }[] = [
  { value: "bitcoin", label: "Bitcoin (BTC)" },
  { value: "ethereum", label: "Ethereum (ETH)" },
  { value: "solana", label: "Solana (SOL)" },
  { value: "polygon", label: "Polygon (MATIC)" },
  { value: "bsc", label: "BNB Smart Chain (BSC)" },
  { value: "tron", label: "Tron (TRX)" },
];

export function getWalletNetworkLabel(network: WalletNetwork): string {
  return WALLET_NETWORKS.find((n) => n.value === network)?.label ?? network;
}
