"use client";

import { FormEvent, useState } from "react";
import { AppButton, AppHeading, AppLink, AppParagraph } from "@/components/ui";
import { showAppAlert } from "@/components/ui/AppAlert";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-metropolis-medium text-white placeholder:text-white/45 outline-none transition focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/35";

export function SignInForm() {
  const [pending, setPending] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    window.setTimeout(() => {
      setPending(false);
      showAppAlert("Wire this form to your auth provider (e.g. NextAuth credentials).", {
        title: "Sign in",
        description: email ? `Attempted: ${email}` : undefined,
        variant: "info",
      });
    }, 450);
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit} noValidate>
      <div>
        <AppHeading as={1} size="md" className="text-white dark:text-white">
          Sign in
        </AppHeading>
        <AppParagraph
          variant="caption"
          size="sm"
          className="mt-1 text-white/75 dark:text-white/75"
        >
          Use your credentials to continue.
        </AppParagraph>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="auth-email" className="mb-1.5 block text-sm font-metropolis-medium text-white/90">
            Email
          </label>
          <input
            id="auth-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@organization.com"
            className={fieldClass}
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <label htmlFor="auth-password" className="text-sm font-metropolis-medium text-white/90">
              Password
            </label>
            <AppLink
              href="/reset"
              variant="muted"
              className="text-xs text-white/70 hover:text-white dark:text-white/70 dark:hover:text-white"
            >
              Forgot password?
            </AppLink>
          </div>
          <input
            id="auth-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className={fieldClass}
          />
        </div>
      </div>

      <AppButton
        type="submit"
        variant="primary"
        size="lg"
        disabled={pending}
        className={cn("w-full", pending && "opacity-80")}
      >
        {pending ? "Signing in…" : "Sign in"}
      </AppButton>

      <p className="text-center text-sm text-white/70">
        Need to verify?{" "}
        <AppLink
          href="/verify"
          variant="primary"
          className="text-white underline-offset-4 hover:underline dark:text-white"
        >
          Email verification
        </AppLink>
  
      </p>
    </form>
  );
}
