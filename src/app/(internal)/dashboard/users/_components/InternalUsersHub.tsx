"use client";

import { useCallback, useMemo } from "react";
import type { InternalUserDemographyRow, InternalUserRow } from "../_data/internal-users-dummy";
import { useUIStore } from "@/store/ui-store";
import { InternalUsersDirectory } from "./InternalUsersDirectory";
import { InternalUsersInsightsPanel } from "./InternalUsersInsightsPanel";
import { InternalUserProfileSidebar } from "./InternalUserProfileSidebar";

export function InternalUsersHub({
  users,
  demography,
}: {
  users: InternalUserRow[];
  demography: InternalUserDemographyRow[];
}) {
  const openSidebar = useUIStore((s) => s.openSidebar);

  const onlineUsers = useMemo(() => users.filter((u) => u.online), [users]);
  const newSignups = useMemo(
    () =>
      [...users]
        .filter((u) => u.isNewSignup)
        .sort((a, b) => a.id.localeCompare(b.id))
        .slice(0, 8),
    [users]
  );

  const openProfile = useCallback(
    (user: InternalUserRow) => {
      const title =
        user.displayName.length > 32 ? `${user.displayName.slice(0, 30)}…` : user.displayName;
      openSidebar({
        title,
        panelClassName: "w-full max-w-full sm:max-w-md lg:w-[min(28rem,calc(100vw-1.5rem))]",
        content: <InternalUserProfileSidebar user={user} />,
      });
    },
    [openSidebar]
  );

  return (
    <div className="w-full space-y-10">
      <InternalUsersInsightsPanel
        demography={demography}
        onlineUsers={onlineUsers}
        newSignups={newSignups}
        onPickUser={openProfile}
      />

      <section className="rounded-2xl border border-captionDark/15 bg-surface-light px-4 py-6 shadow-sm sm:px-6 sm:py-8 dark:border-captionDark-dark/20 dark:bg-surface-dark">
        <InternalUsersDirectory users={users} onPickUser={openProfile} />
      </section>
    </div>
  );
}
