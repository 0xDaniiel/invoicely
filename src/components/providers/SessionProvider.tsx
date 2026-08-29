// src/components/providers/SessionProvider.tsx
"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { ReactNode } from "react";

// Thin wrapper because next-auth's SessionProvider must be a client
// component, but layout.tsx (where it's mounted) is a server component.
// The initial session is fetched server-side and passed in, so there's no
// loading flash on first render.
export function SessionProvider({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}
