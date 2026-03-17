"use client";

import Link from "next/link";
import {
  AppHeading,
  AppButton,
  AppParagraph,
  AppLink,
  AppImage,
} from "@/components/ui";
import { useUIStore } from "@/store/ui-store";
import { showAppAlert } from "@/components/ui";

export default function DesignSystemPage() {
  const openModal = useUIStore((state) => state.openModal);
  const openSidebar = useUIStore((state) => state.openSidebar);

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark font-metropolis">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <AppHeading as={1} size="sm">
            ResQ Design System
          </AppHeading>
          <div className="flex items-center gap-3">
            <AppLink href="/" variant="muted">
              ← Home
            </AppLink>
            <AppButton variant="outline" size="sm" asChild>
              <Link href="/">Back</Link>
            </AppButton>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 space-y-16">
        {/* Colors */}
        <section>
          <AppHeading as={2} size="lg" className="mb-2">
            Colors
          </AppHeading>
          <AppParagraph variant="caption" className="mb-8">
            Primary, accent, surface, success, and typography tokens.
          </AppParagraph>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <AppParagraph weight="medium" className="mb-4 text-sm text-captionDark dark:text-captionDark-dark">
                Primary
              </AppParagraph>
              <div className="flex flex-wrap gap-3">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="h-16 w-24 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm"
                    style={{ backgroundColor: "#0000FF" }}
                  />
                  <span className="text-xs text-captionDark dark:text-captionDark-dark">blue</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="h-16 w-24 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm"
                    style={{ backgroundColor: "#3333FF" }}
                  />
                  <span className="text-xs text-captionDark dark:text-captionDark-dark">blue-dark</span>
                </div>
              </div>
            </div>

            <div>
              <AppParagraph weight="medium" className="mb-4 text-sm text-captionDark dark:text-captionDark-dark">
                Accent
              </AppParagraph>
              <div className="flex flex-wrap gap-3">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="h-16 w-24 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm"
                    style={{ backgroundColor: "#F00033" }}
                  />
                  <span className="text-xs text-captionDark dark:text-captionDark-dark">red</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="h-16 w-24 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm"
                    style={{ backgroundColor: "#FF3366" }}
                  />
                  <span className="text-xs text-captionDark dark:text-captionDark-dark">red-dark</span>
                </div>
              </div>
            </div>

            <div>
              <AppParagraph weight="medium" className="mb-4 text-sm text-captionDark dark:text-captionDark-dark">
                Surface
              </AppParagraph>
              <div className="flex flex-wrap gap-3">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="h-16 w-24 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm"
                    style={{ backgroundColor: "#F7F7F7" }}
                  />
                  <span className="text-xs text-captionDark dark:text-captionDark-dark">light</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="h-16 w-24 rounded-lg border border-gray-600 shadow-sm"
                    style={{ backgroundColor: "#121212" }}
                  />
                  <span className="text-xs text-captionDark dark:text-captionDark-dark">dark</span>
                </div>
              </div>
            </div>

            <div>
              <AppParagraph weight="medium" className="mb-4 text-sm text-captionDark dark:text-captionDark-dark">
                Success
              </AppParagraph>
              <div className="flex flex-wrap gap-3">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="h-16 w-24 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm"
                    style={{ backgroundColor: "#17A34A" }}
                  />
                  <span className="text-xs text-captionDark dark:text-captionDark-dark">green</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="h-16 w-24 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm"
                    style={{ backgroundColor: "#22C55E" }}
                  />
                  <span className="text-xs text-captionDark dark:text-captionDark-dark">green-dark</span>
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <AppParagraph weight="medium" className="mb-4 text-sm text-captionDark dark:text-captionDark-dark">
                Typography
              </AppParagraph>
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col gap-1">
                  <div className="h-12 w-32 rounded-lg bg-primaryDark" />
                  <span className="text-xs text-captionDark dark:text-captionDark-dark">primaryDark</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="h-12 w-32 rounded-lg bg-primaryDark-dark" />
                  <span className="text-xs text-captionDark dark:text-captionDark-dark">primaryDark-dark</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="h-12 w-32 rounded-lg bg-captionDark" />
                  <span className="text-xs text-captionDark dark:text-captionDark-dark">captionDark</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="h-12 w-32 rounded-lg bg-captionDark-dark" />
                  <span className="text-xs text-captionDark dark:text-captionDark-dark">captionDark-dark</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gradients */}
        <section>
          <AppHeading as={2} size="lg" className="mb-2">
            Gradients
          </AppHeading>
          <AppParagraph variant="caption" className="mb-8">
            Theme gradients: hero, radial glow, primary, accent, surface.
          </AppParagraph>

          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <AppParagraph variant="caption" className="text-sm">bg-gradient-hero</AppParagraph>
              <div className="h-24 w-full rounded-xl bg-gradient-hero" />
            </div>
            <div className="flex flex-col gap-2">
              <AppParagraph variant="caption" className="text-sm">bg-gradient-hero-radial (with blur on home)</AppParagraph>
              <div className="relative h-24 w-full overflow-hidden rounded-xl bg-resq-mid">
                <div className="absolute inset-0 bg-gradient-hero-radial" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex flex-col gap-2">
                <AppParagraph variant="caption" className="text-sm">bg-gradient-primary</AppParagraph>
                <div className="h-20 rounded-xl bg-gradient-primary" />
              </div>
              <div className="flex flex-col gap-2">
                <AppParagraph variant="caption" className="text-sm">bg-gradient-accent</AppParagraph>
                <div className="h-20 rounded-xl bg-gradient-accent" />
              </div>
              <div className="flex flex-col gap-2">
                <AppParagraph variant="caption" className="text-sm">bg-gradient-surface</AppParagraph>
                <div className="h-20 rounded-xl bg-gradient-surface" />
              </div>
            </div>
            <AppParagraph variant="caption" size="sm">
              CSS variables: --gradient-start, --gradient-mid, --gradient-end, --gradient-radial-inner/mid/outer (in globals.css).
            </AppParagraph>
          </div>
        </section>

        {/* Typography */}
        <section>
          <AppHeading as={2} size="lg" className="mb-2">
            Typography
          </AppHeading>
          <AppParagraph variant="caption" className="mb-8">
            Metropolis font family and AppHeading / AppParagraph components.
          </AppParagraph>

          <div className="space-y-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50 p-8">
            <div>
              <AppParagraph variant="caption" className="mb-3">AppHeading</AppParagraph>
              <div className="space-y-4">
                <AppHeading as={1} size="xl">Heading XL</AppHeading>
                <AppHeading as={2} size="lg">Heading LG</AppHeading>
                <AppHeading as={3} size="md">Heading MD</AppHeading>
                <AppHeading as={4} size="sm">Heading SM</AppHeading>
              </div>
            </div>

            <div>
              <AppParagraph variant="caption" className="mb-3">Weights (Metropolis)</AppParagraph>
              <div className="space-y-2 text-primaryDark dark:text-primaryDark-dark">
                <p className="font-metropolis-thin">Thin – The quick brown fox</p>
                <p className="font-metropolis-light">Light – The quick brown fox</p>
                <p className="font-metropolis-regular">Regular – The quick brown fox</p>
                <p className="font-metropolis-medium">Medium – The quick brown fox</p>
                <p className="font-metropolis-semibold">SemiBold – The quick brown fox</p>
                <p className="font-metropolis-bold">Bold – The quick brown fox</p>
                <p className="font-metropolis-extrabold">ExtraBold – The quick brown fox</p>
                <p className="font-metropolis-black">Black – The quick brown fox</p>
              </div>
            </div>

            <div>
              <AppParagraph variant="caption" className="mb-3">AppParagraph</AppParagraph>
              <div className="space-y-4">
                <AppParagraph variant="body" size="lg">
                  Body large – Use for lead or emphasis. Metropolis Regular.
                </AppParagraph>
                <AppParagraph variant="body" size="md">
                  Body medium – Default body text. Comfortable for long reading.
                </AppParagraph>
                <AppParagraph variant="body" size="sm">
                  Body small – Secondary content or dense UI.
                </AppParagraph>
                <AppParagraph variant="caption" size="md">
                  Caption – Muted supporting text, labels, or timestamps.
                </AppParagraph>
              </div>
            </div>
          </div>
        </section>

        {/* Glass / overlays */}
        <section>
          <AppHeading as={2} size="lg" className="mb-2">
            Overlays & glass
          </AppHeading>
          <AppParagraph variant="caption" className="mb-8">
            Global glassmorphism modal and sidebar, powered by Zustand + persist.
          </AppParagraph>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200/70 dark:border-gray-700/70 bg-white/70 dark:bg-black/40 p-6 backdrop-blur-xl">
              <AppParagraph variant="caption" className="mb-3 text-xs uppercase tracking-[0.16em] text-captionDark dark:text-captionDark-dark">
                AppModalRoot (glass)
              </AppParagraph>
              <AppParagraph variant="body" className="mb-4 text-sm">
                Opens a centered glassmorphism modal with a frosted black backdrop
                (<code className="rounded bg-black/10 px-1 py-0.5 text-[11px]">backdrop-blur-xl</code>).
              </AppParagraph>
              <AppButton
                variant="primary"
                size="sm"
                onClick={() =>
                  openModal({
                    title: "ResQ glass modal",
                    size: "md",
                    content: (
                      <div className="space-y-3 text-sm">
                        <AppParagraph variant="body" size="sm">
                          This is a global modal rendered from anywhere in the app. The
                          backdrop and surface both use glassmorphism — subtle blur,
                          transparency and soft borders.
                        </AppParagraph>
                        <AppParagraph variant="caption" size="sm">
                          Hook it up to confirmations, quick inspectors, or lightweight
                          creation flows.
                        </AppParagraph>
                      </div>
                    ),
                  })
                }
              >
                Open glass modal
              </AppButton>
            </div>

            <div className="rounded-xl border border-gray-200/70 dark:border-gray-700/70 bg-white/70 dark:bg-black/40 p-6 backdrop-blur-xl">
              <AppParagraph variant="caption" className="mb-3 text-xs uppercase tracking-[0.16em] text-captionDark dark:text-captionDark-dark">
                AppSidebarRoot (glass)
              </AppParagraph>
              <AppParagraph variant="body" className="mb-4 text-sm">
                Opens a right-hand glass sidebar with a blurred backdrop. Useful for
                quick panels, filters, or multi-step flows.
              </AppParagraph>
              <AppButton
                variant="accent"
                size="sm"
                onClick={() =>
                  openSidebar({
                    title: "Glass sidebar",
                    content: (
                      <div className="space-y-3 text-sm">
                        <AppParagraph variant="body" size="sm">
                          This sidebar slides over a glass backdrop so underlying content
                          stays visible but deemphasised.
                        </AppParagraph>
                        <AppParagraph variant="caption" size="sm">
                          Wire this to filters, incident details, or command shortcuts.
                        </AppParagraph>
                      </div>
                    ),
                  })
                }
              >
                Open glass sidebar
              </AppButton>
            </div>

            <div className="rounded-xl border border-gray-200/70 dark:border-gray-700/70 bg-white/70 dark:bg-black/40 p-6 backdrop-blur-xl">
              <AppParagraph
                variant="caption"
                className="mb-3 text-xs uppercase tracking-[0.16em] text-captionDark dark:text-captionDark-dark"
              >
                AppAlert (toaster)
              </AppParagraph>
              <AppParagraph variant="body" className="mb-4 text-sm">
                Brand-aware alerts for incidents, media actions, and agency workflows. Uses the
                global glass toaster and ResQ colors.
              </AppParagraph>
              <div className="flex flex-wrap gap-3">
                <AppButton
                  variant="surface"
                  size="sm"
                  onClick={() =>
                    showAppAlert("This is a neutral ResQ alert.", {
                      title: "Info",
                      variant: "info",
                    })
                  }
                >
                  Info
                </AppButton>
                <AppButton
                  variant="success"
                  size="sm"
                  onClick={() =>
                    showAppAlert("Incident routed to Lagos agency.", {
                      title: "Routed",
                      variant: "success",
                      description: "You can track it from the Agencies / Cases workspace.",
                    })
                  }
                >
                  Success
                </AppButton>
                <AppButton
                  variant="accent"
                  size="sm"
                  onClick={() =>
                    showAppAlert("Some broadcasts failed to send.", {
                      title: "Warning",
                      variant: "warning",
                    })
                  }
                >
                  Warning
                </AppButton>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <AppHeading as={2} size="lg" className="mb-2">
            Buttons
          </AppHeading>
          <AppParagraph variant="caption" className="mb-8">
            AppButton variants and sizes.
          </AppParagraph>

          <div className="space-y-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50 p-8">
            <div>
              <AppParagraph variant="caption" className="mb-4">Variants</AppParagraph>
              <div className="flex flex-wrap gap-4">
                <AppButton variant="primary">Primary</AppButton>
                <AppButton variant="accent">Accent</AppButton>
                <AppButton variant="success">Success</AppButton>
                <AppButton variant="surface">Surface</AppButton>
                <AppButton variant="outline">Outline</AppButton>
                <AppButton variant="ghost">Ghost</AppButton>
              </div>
            </div>
            <div>
              <AppParagraph variant="caption" className="mb-4">Sizes</AppParagraph>
              <div className="flex flex-wrap items-center gap-4">
                <AppButton variant="primary" size="sm">Small</AppButton>
                <AppButton variant="primary" size="md">Medium</AppButton>
                <AppButton variant="primary" size="lg">Large</AppButton>
              </div>
            </div>
          </div>
        </section>

        {/* Links */}
        <section>
          <AppHeading as={2} size="lg" className="mb-2">
            Links
          </AppHeading>
          <AppParagraph variant="caption" className="mb-8">
            AppLink variants. Internal routes use Next.js Link.
          </AppParagraph>

          <div className="space-y-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50 p-8">
            <div className="flex flex-wrap gap-6">
              <AppLink href="/design-system" variant="default">Default link</AppLink>
              <AppLink href="/design-system" variant="primary">Primary link</AppLink>
              <AppLink href="/design-system" variant="accent">Accent link</AppLink>
              <AppLink href="/design-system" variant="muted">Muted link</AppLink>
            </div>
            <div className="flex flex-wrap gap-6">
              <AppLink href="/design-system" variant="default" underline>Default underlined</AppLink>
              <AppLink href="/design-system" variant="primary" underline>Primary underlined</AppLink>
            </div>
          </div>
        </section>

        {/* Image */}
        <section>
          <AppHeading as={2} size="lg" className="mb-2">
            Image
          </AppHeading>
          <AppParagraph variant="caption" className="mb-8">
            AppImage wraps next/image with optional wrapper and image classes.
          </AppParagraph>

          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50 p-8">
            <AppImage
              src="/logo-white.png"
              alt="ResQ logo"
              width={120}
              height={120}
              wrapperClassName="inline-block rounded-lg bg-surface-dark p-4"
              className="object-contain"
            />
            <AppParagraph variant="caption" className="mt-4">
              Logo on dark surface (wrapperClassName + className).
            </AppParagraph>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <AppParagraph variant="caption">
            ResQ Design System · Metropolis · Primary Blue #0000FF · Accent Red #F00033
          </AppParagraph>
        </footer>
      </main>
    </div>
  );
}
