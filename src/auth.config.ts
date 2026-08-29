// src/auth.config.ts
import type { NextAuthConfig } from "next-auth";

// Kept deliberately minimal: no PrismaAdapter, no provider config here.
// Next.js middleware runs in the Edge Runtime by default, and Prisma's
// `pg` driver adapter needs Node APIs (net/tls) that don't exist there.
// This file is imported by BOTH `src/middleware.ts` (edge, route-guarding
// only) and `src/auth.ts` (full Node config, adds the adapter + providers).
export const authConfig = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        return isLoggedIn; // false triggers a redirect to `pages.signIn`
      }
      return true;
    },
  },
  providers: [], // real providers are only added in src/auth.ts
} satisfies NextAuthConfig;
