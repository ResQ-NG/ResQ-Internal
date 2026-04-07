"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppButton, AppHeading, AppLink, AppParagraph } from "@/components/ui";
import { showAppAlert } from "@/components/ui/AppAlert";
import { cn } from "@/lib/utils";

type Phase = "pending" | "success";

export function VerifyPanel({ token }: { token?: string }) {
  const [phase, setPhase] = useState<Phase | null>(token ? "pending" : null);
  const [resendPending, setResendPending] = useState(false);

  useEffect(() => {
    if (!token) return;
    const t = window.setTimeout(() => {
      setPhase("success");
    }, 900);
    return () => window.clearTimeout(t);
  }, [token]);

  if (token) {
    return (
      <div className="space-y-6 text-center">
        <AppHeading as={1} size="md" className="text-white dark:text-white">
          {phase === "pending" && "Confirming your email"}
          {phase === "success" && "You are verified"}
        </AppHeading>
        <AppParagraph
          variant="caption"
          size="sm"
          className="text-white/75 dark:text-white/75"
        >
          {phase === "pending" &&
            "Hang tight — we are validating your verification link."}
          {phase === "success" &&
            "Your email is confirmed. You can close this tab or continue to sign in."}
        </AppParagraph>
        {phase === "success" && (
          <Link
            href="/authourize"
            className={cn(
              "inline-flex w-full items-center justify-center rounded-lg px-6 py-3 text-lg font-metropolis-medium transition-colors",
              "bg-primary-blue text-white hover:bg-primary-blue-dark",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            )}
          >
            Continue to sign in
          </Link>
        )}
        {phase === "pending" && (
          <div
            className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/25 border-t-white"
            aria-hidden
          />
        )}
      </div>
    );
  }

  function onResend() {
    setResendPending(true);
    window.setTimeout(() => {
      setResendPending(false);
      showAppAlert("Verification link sent (demo). Connect to your mailer for production.", {
        title: "Resend",
        variant: "info",
      });
    }, 500);
  }

  return (
    <div className="space-y-6">
      <div>
        <AppHeading as={1} size="md" className="text-white dark:text-white">
          Verify your email
        </AppHeading>
        <AppParagraph
          variant="caption"
          size="sm"
          className="mt-1 text-white/75 dark:text-white/75"
        >
          We sent a link to your inbox. Open it on this device to activate your
          account. You can resend if it does not arrive within a few minutes.
        </AppParagraph>
      </div>

      <AppButton
        type="button"
        variant="outline"
        size="lg"
        disabled={resendPending}
        onClick={onResend}
        className={cn(
          "w-full border-white/40 text-white hover:bg-white hover:text-resq-deep dark:border-white/40 dark:text-white dark:hover:bg-white dark:hover:text-resq-deep",
          resendPending && "opacity-80"
        )}
      >
        {resendPending ? "Sending…" : "Resend verification email"}
      </AppButton>

      <p className="text-center text-sm text-white/70">
        <AppLink
          href="/authourize"
          variant="primary"
          className="text-white underline-offset-4 hover:underline dark:text-white"
        >
          Sign in instead
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
    </div>
  );
}
