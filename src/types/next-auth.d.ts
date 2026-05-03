import type { AuthUserProfile } from "@/lib/utils/auth";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: AuthUserProfile & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    profile?: AuthUserProfile;
  }
}
