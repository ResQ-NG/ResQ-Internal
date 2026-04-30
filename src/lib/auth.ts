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
  user: AuthUserProfile;
}

function apiBaseUrl(): string | undefined {
  const raw = mustEnv("NEXT_PUBLIC_API_URL");
  if (!raw) return undefined;
  return raw.replace(/\/$/, "");
}

export const authOptions: NextAuthOptions = {
  secret: mustEnv("NEXTAUTH_SECRET"),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/authourize",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist access token + profile from Credentials authorize().
      if (user && typeof user === "object") {
        const u = user as unknown as { accessToken?: string; profile?: AuthUserProfile };
        if (u.accessToken) token.accessToken = u.accessToken;
        if (u.profile) token.profile = u.profile;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) (session as any).accessToken = token.accessToken;
      if (token?.profile) session.user = token.profile as any;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password ?? "";

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
        if (!data?.token || !data?.user) return null;

        const fullName = `${data.user.first_name ?? ""} ${data.user.last_name ?? ""}`.trim() || "ResQ User";
        return {
          id: String(data.user.id),
          name: fullName,
          email: data.user.email,
          accessToken: data.token,
          profile: data.user,
        };
      },
    }),
  ],
};
