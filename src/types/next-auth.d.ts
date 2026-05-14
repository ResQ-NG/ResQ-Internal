import type { AuthUserProfile } from "@/lib/utils/auth";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    /** ISO timestamp when the wall-clock session ends (used with “Remember me”). */
    sessionAbsoluteExpires?: string;
    rememberMe?: boolean;
    user: AuthUserProfile & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    profile?: AuthUserProfile;
    rememberMe?: boolean;
    /** Unix seconds when the user signed in (used to compute session wall clock). */
    loginAtSec?: number;
  }
}
