// src/auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),

  // JWT rather than the adapter's default "database" strategy — required
  // because middleware (Edge Runtime) validates the session on every
  // matched request and can't reach Prisma to look up a DB-backed session.
  // The adapter is still used for its real job: persisting User/Account
  // rows on first Google sign-in.
  session: { strategy: "jwt" },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  // Explicit rather than relying on env-var name auto-detection, since
  // .env already establishes NEXTAUTH_SECRET as the name in use.
  secret: process.env.NEXTAUTH_SECRET,

  // Required for self-hosted deployments (this app runs on a VPS via pm2,
  // not Vercel). Without it, Auth.js won't trust the incoming Host header
  // and auth will fail outside of a platform that sets this automatically.
  trustHost: true,

  callbacks: {
    ...authConfig.callbacks,
    // Attach the Prisma user id onto the JWT, then onto the session, so
    // `session.user.id` is available wherever the session is read (e.g.
    // scoping Invoice queries to the signed-in user).
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
