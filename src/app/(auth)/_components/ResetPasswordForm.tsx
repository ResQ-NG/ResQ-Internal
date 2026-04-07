"use client";

import { FormEvent, useState } from "react";
import { AppButton, AppHeading, AppLink, AppParagraph } from "@/components/ui";
import { showAppAlert } from "@/components/ui/AppAlert";

const fieldClass =
  "w-full rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-metropolis-medium text-white placeholder:text-white/45 outline-none transition focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/35";

export function ResetPasswordForm() {
  const [pending, setPending] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    window.setTimeout(() => {
      setPending(false);
      showAppAlert(
        "If an account exists for that address, you will receive a reset link shortly.",
        {
          title: "Check your inbox",
          description: email || undefined,
          variant: "success",
        }
      );
      form.reset();
    }, 500);
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit} noValidate>
      <div>
        <AppHeading as={1} size="md" className="text-white dark:text-white">
          Reset password
        </AppHeading>
        <AppParagraph
          variant="caption"
          size="sm"
          className="mt-1 text-white/75 dark:text-white/75"
        >
          We will email you a link to choose a new password.
        </AppParagraph>
      </div>

      <div>
        <label htmlFor="reset-email" className="mb-1.5 block text-sm font-metropolis-medium text-white/90">
          Email
        </label>
        <input
          id="reset-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@organization.com"
          className={fieldClass}
        />
      </div>

      <AppButton
        type="submit"
        variant="primary"
        size="lg"
        loading={pending}
        className="w-full"
      >
        Send reset link
      </AppButton>

      <p className="text-center text-sm text-white/70">
        <AppLink
          href="/authourize"
          variant="primary"
          className="text-white underline-offset-4 hover:underline dark:text-white"
        >
          Back to sign in
        </AppLink>
        {" · "}
        <AppLink
          href="/"
          variant="muted"
          className="text-white/70 hover:text-white dark:text-white/70 dark:hover:text-white"
        >
          Home
        </AppLink>
      </p>
    </form>
  );
}
