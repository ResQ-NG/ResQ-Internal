import type { ReactNode } from "react";
import { AuthBranding } from "./_components/AuthBranding";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-hero">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div className="h-[600px] w-[600px] rounded-full bg-gradient-hero-radial blur-3xl" />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <AuthBranding />
        <div className="mt-10 w-full max-w-[420px]">{children}</div>
      </div>
    </div>
  );
}
