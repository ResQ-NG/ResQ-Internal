"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AppButton, AppParagraph } from "@/components/ui";
import { useUIStore } from "@/store/ui-store";

function MagicKeysForm() {
  const router = useRouter();
  const closeModal = useUIStore((s) => s.closeModal);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    closeModal();
    router.push("/authourize");
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <AppParagraph variant="caption" size="sm" className="text-captionDark-dark">
        Enter the magic keys you were given. You will be taken to sign in next.
      </AppParagraph>
      <div>
        <label htmlFor="magic-keys" className="sr-only">
          Magic keys
        </label>
        <input
          id="magic-keys"
          name="magicKeys"
          type="password"
          autoComplete="off"
          placeholder="Magic keys"
          className="w-full rounded-lg border border-white/15 bg-black/25 px-3 py-2.5 text-sm font-metropolis-medium text-primaryDark-dark placeholder:text-captionDark-dark outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/30"
        />
      </div>
      <AppButton type="submit" variant="primary" size="md" className="w-full">
        Continue
      </AppButton>
    </form>
  );
}

export function HomeAccessButton() {
  const openModal = useUIStore((s) => s.openModal);

  return (
    <AppButton
      type="button"
      variant="surface"
      size="lg"

      onClick={() =>
        openModal({
          title: "Request access",
          size: "sm",
          content: <MagicKeysForm />,
        })
      }
      className="bg-black"
    >
      Request access
    </AppButton>
  );
}
