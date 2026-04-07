import { LottieLogo } from "@/components/LottieLogo";
import { HomeAccessButton } from "./_components/HomeAccessButton";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-hero bg-[length:240%_240%] bg-no-repeat motion-safe:animate-hero-gradient">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div className="absolute h-[640px] w-[640px] rounded-full bg-gradient-hero-radial blur-3xl will-change-transform motion-safe:animate-hero-radial" />
        <div className="absolute h-[420px] w-[420px] rounded-full bg-gradient-hero-radial blur-3xl opacity-80 will-change-transform motion-safe:animate-hero-radial-alt" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-10 px-4">
        <div className="w-48 h-48" aria-hidden>
          <LottieLogo />
        </div>
        <HomeAccessButton />
      </div>
    </main>
  );
}
