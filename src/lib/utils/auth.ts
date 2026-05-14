import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

function mustEnv(name: string): string | undefined {
  const v = process.env[name];
  if (!v) return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
}

export interface AuthUserProfile {
  avatar_url: string;
  created_at: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

export interface LoginWithIdentifierResponse {
  token: string;
  refresh_token: string;
  user: AuthUserProfile;
}

function apiBaseUrl(): string | undefined {
  const raw = mustEnv("NEXT_PUBLIC_API_URL");
  if (!raw) return undefined;
  return raw.replace(/\/$/, "");
}

/** NextAuth session cookie `maxAge` (seconds); must be ≥ longest wall-clock session below. */
export const SESSION_COOKIE_MAX_AGE_SECONDS = 30 * 24 * 60 * 60;

/** Wall-clock session length when “Remember me” is checked (seconds). */
const SESSION_WALL_REMEMBER_SECONDS = 30 * 24 * 60 * 60;

/** Wall-clock session length without “Remember me” (seconds). */
const SESSION_WALL_NO_REMEMBER_SECONDS = 24 * 60 * 60;

function parseRememberMe(value: unknown): boolean {
  return value === true || value === "true" || value === "on" || value === "1";
}

export const authOptions: NextAuthOptions = {
  secret: mustEnv("NEXTAUTH_SECRET"),
  session: {
    strategy: "jwt",
    maxAge: SESSION_COOKIE_MAX_AGE_SECONDS,
  },
  pages: {
    signIn: "/authourize",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session && typeof session === "object") {
        const s = session as { accessToken?: string; refreshToken?: string };
        if (typeof s.accessToken === "string" && s.accessToken) token.accessToken = s.accessToken;
        if (typeof s.refreshToken === "string" && s.refreshToken) token.refreshToken = s.refreshToken;
        return token;
      }

      // Persist access + refresh tokens + profile from Credentials authorize().
      if (user && typeof user === "object") {
        const u = user as unknown as {
          accessToken?: string;
          refreshToken?: string;
          profile?: AuthUserProfile;
          rememberMe?: boolean;
        };
        if (u.accessToken) token.accessToken = u.accessToken;
        if (u.refreshToken) token.refreshToken = u.refreshToken;
        if (u.profile) token.profile = u.profile;
        token.rememberMe = u.rememberMe === true;
        token.loginAtSec = Math.floor(Date.now() / 1000);
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) (session as any).accessToken = token.accessToken;
      if (token?.refreshToken) (session as any).refreshToken = token.refreshToken;
      if (token?.profile) session.user = token.profile as any;

      const loginAtSec = token.loginAtSec;
      const rememberMe = token.rememberMe === true;
      (session as any).rememberMe = rememberMe;
      if (typeof loginAtSec === "number" && Number.isFinite(loginAtSec)) {
        const wallSec = rememberMe ? SESSION_WALL_REMEMBER_SECONDS : SESSION_WALL_NO_REMEMBER_SECONDS;
        (session as any).sessionAbsoluteExpires = new Date(loginAtSec * 1000 + wallSec * 1000).toISOString();
      }

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember me", type: "text" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password ?? "";
        const rememberMe = parseRememberMe(credentials?.rememberMe);

        if (!email || !password) return null;

        const baseUrl = apiBaseUrl();
        if (!baseUrl) return null;

        const res = await fetch(`${baseUrl}/v1/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: "email",
            email,
            password,
          }),
        });

        if (!res.ok) return null;



        const data = ((await res.json()) as { data: LoginWithIdentifierResponse }).data;
        if (!data?.token || !data?.user || !data?.refresh_token) return null;

        const fullName = `${data.user.first_name ?? ""} ${data.user.last_name ?? ""}`.trim() || "ResQ User";
        return {
          id: String(data.user.id),
          name: fullName,
          email: data.user.email,
          accessToken: data.token,
          refreshToken: data.refresh_token,
          profile: data.user,
          rememberMe,
        };
      },
    }),
  ],
};
