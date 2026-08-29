// src/middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Deliberately a separate, lighter NextAuth instance from src/auth.ts —
// built only from the edge-safe config (no PrismaAdapter), since this
// file runs in the Edge Runtime. See src/auth.config.ts for why.
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/dashboard/:path*"],
};
