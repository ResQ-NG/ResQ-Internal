"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { AppButton } from "@/components/ui/AppButton";
import { AppParagraph } from "@/components/ui/AppParagraph";
import { useLogout } from "@/network/modules/shared/auth/queries";
import { useUIStore } from "@/store/ui-store";

type SessionWithTokens = {
  accessToken?: string;
  refreshToken?: string;
};

export function ConfirmLogoutModalContent() {
  const closeModal = useUIStore((s) => s.closeModal);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { data: session } = useSession();
  const { mutateAsync: logoutOnServer } = useLogout();

  return (
    <div>
      <AppParagraph variant="body" size="sm" className="mb-5 text-captionDark-dark">
        You’ll be logged out and may need to sign in again to continue.
      </AppParagraph>

      <div className="flex items-center justify-end gap-2">
        <AppButton
          type="button"
          variant="outline"
          size="md"
          disabled={isSigningOut}
          onClick={closeModal}
        >
          Cancel
        </AppButton>
        <AppButton
          type="button"
          variant="primary"
          size="md"
          disabled={isSigningOut}
          onClick={async () => {
            if (isSigningOut) return;
            setIsSigningOut(true);
            try {
              const s = session as SessionWithTokens | null;
              const body =
                s?.refreshToken != null && s.refreshToken !== ""
                  ? { refresh_token: s.refreshToken }
                  : {};
              try {
                await logoutOnServer(body);
              } catch {
                /* Bearer may already be invalid; continue with client sign-out */
              }
              closeModal();
              await signOut({ callbackUrl: "/authourize" });
            } finally {
              setIsSigningOut(false);
            }
          }}
        >
          Sign out
        </AppButton>
      </div>
    </div>
  );
}

