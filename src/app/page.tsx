import { LottieLogo } from "@/components/LottieLogo";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Radial gradient glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-gradient-hero-radial blur-3xl" />
      </div>

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        <div className="w-48 h-48" aria-hidden>
          <LottieLogo />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="/dashboard"
            className="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur hover:bg-white/20"
          >
            Dashboard →
          </a>
          <a
            href="/design-system"
            className="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur hover:bg-white/20"
          >
            Design System →
          </a>
        </div>
      </div>
    </main>
  );
}
