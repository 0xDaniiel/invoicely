// src/types/next-auth.d.ts
import type { DefaultSession } from "next-auth";

// The default Session type doesn't include `id` on `user` — we add it in
// the `session` callback in src/auth.ts, so the type needs to know about it
// too, or every call site would need an unsafe cast.
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
