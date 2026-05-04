"use client";

import { MapPin, Radio, UserPlus } from "lucide-react";
import type { InternalUserDemographyRow, InternalUserRow } from "../_data/internal-users-dummy";
import { AppParagraph } from "@/components/ui";
import { cn } from "@/lib/utils/generics";

function DemographyColumn({
  rows,
  maxRows = 6,
}: {
  rows: InternalUserDemographyRow[];
  maxRows?: number;
}) {
  const top = rows.slice(0, maxRows);
  const maxScore = Math.max(1, ...top.map((r) => r.activityScore));

  return (
    <div className="flex min-h-0 min-w-0 flex-col p-5 md:p-6">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-captionDark/10 text-primaryDark dark:bg-captionDark-dark/20 dark:text-primaryDark-dark">
          <MapPin className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <p className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
            Activity by state
          </p>
          <AppParagraph variant="caption" className="text-[11px] leading-snug">
            Ranked by demo session + recency weight.
          </AppParagraph>
        </div>
      </div>
      <ul className="min-h-0 flex-1 space-y-2.5 overflow-y-auto pr-1 [scrollbar-width:thin]">
        {top.map((r) => (
          <li key={r.state}>
            <div className="mb-1 flex items-center justify-between gap-2 text-[11px]">
              <span className="min-w-0 truncate font-metropolis-medium text-primaryDark dark:text-primaryDark-dark">
                {r.state}
              </span>
              <span className="shrink-0 font-mono text-[10px] text-captionDark dark:text-captionDark-dark">
                {r.userCount} ·{" "}
                <span className="text-emerald-600 dark:text-emerald-300">{r.onlineCount} on</span>
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-captionDark/10 dark:bg-captionDark-dark/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primaryDark/35 to-emerald-500/80 dark:from-primaryDark-dark/40 dark:to-emerald-400/75"
                style={{ width: `${(r.activityScore / maxScore) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OnlineColumn({
  onlineUsers,
  onPickUser,
}: {
  onlineUsers: InternalUserRow[];
  onPickUser: (u: InternalUserRow) => void;
}) {
  return (
    <div className="flex min-h-0 min-w-0 flex-col border-t border-captionDark/10 p-5 md:border-l md:border-t-0 md:p-6 dark:border-captionDark-dark/15">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-captionDark/10 text-primaryDark dark:bg-captionDark-dark/20 dark:text-primaryDark-dark">
            <Radio className="h-4 w-4" aria-hidden />
          </span>
          <p className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
            Online now
          </p>
        </div>
        <span className="rounded-full bg-emerald-500/12 px-2 py-0.5 text-[10px] font-metropolis-bold text-emerald-800 dark:bg-emerald-400/12 dark:text-emerald-100">
          {onlineUsers.length}
        </span>
      </div>
      <ul className="max-h-52 space-y-1 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]">
        {onlineUsers.length === 0 ? (
          <li className="rounded-lg border border-dashed border-captionDark/15 px-3 py-5 text-center text-[11px] text-captionDark dark:border-captionDark-dark/20 dark:text-captionDark-dark">
            No users online in demo.
          </li>
        ) : (
          onlineUsers.map((u) => (
            <li key={u.id}>
              <button
                type="button"
                onClick={() => onPickUser(u)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors",
                  "hover:bg-captionDark/[0.06] dark:hover:bg-captionDark-dark/[0.08]"
                )}
              >
                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-captionDark/10 text-[10px] font-metropolis-bold text-primaryDark dark:bg-captionDark-dark/20 dark:text-primaryDark-dark">
                  {u.initials}
                  <span
                    className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-surface-light bg-emerald-500 dark:border-surface-dark"
                    aria-hidden
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-metropolis-medium text-primaryDark dark:text-primaryDark-dark">
                    {u.displayName}
                  </span>
                  <span className="block truncate text-[10px] text-captionDark dark:text-captionDark-dark">
                    {u.state} · {u.platform}
                  </span>
                </span>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

function SignupsColumn({
  users,
  onPickUser,
}: {
  users: InternalUserRow[];
  onPickUser: (u: InternalUserRow) => void;
}) {
  return (
    <div className="flex min-h-0 min-w-0 flex-col border-t border-captionDark/10 p-5 md:border-l md:border-t-0 md:p-6 dark:border-captionDark-dark/15">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-captionDark/10 text-primaryDark dark:bg-captionDark-dark/20 dark:text-primaryDark-dark">
          <UserPlus className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <p className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
            New (7d)
          </p>
          <AppParagraph variant="caption" className="text-[11px] leading-snug">
            Latest demo sign-ups.
          </AppParagraph>
        </div>
      </div>
      <ul className="max-h-52 space-y-1 overflow-y-auto pr-1 [scrollbar-width:thin]">
        {users.length === 0 ? (
          <li className="text-[11px] text-captionDark dark:text-captionDark-dark">None in demo window.</li>
        ) : (
          users.map((u) => (
            <li key={u.id}>
              <button
                type="button"
                onClick={() => onPickUser(u)}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left transition-colors",
                  "hover:bg-captionDark/[0.06] dark:hover:bg-captionDark-dark/[0.08]"
                )}
              >
                <span className="min-w-0 truncate text-xs font-metropolis-medium text-primaryDark dark:text-primaryDark-dark">
                  {u.displayName}
                </span>
                <span className="shrink-0 font-mono text-[10px] text-captionDark dark:text-captionDark-dark">
                  {u.signedUpLabel}
                </span>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export function InternalUsersInsightsPanel({
  demography,
  onlineUsers,
  newSignups,
  onPickUser,
}: {
  demography: InternalUserDemographyRow[];
  onlineUsers: InternalUserRow[];
  newSignups: InternalUserRow[];
  onPickUser: (u: InternalUserRow) => void;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-captionDark/15 bg-surface-light shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
      <div className="grid md:grid-cols-3">
        <DemographyColumn rows={demography} />
        <OnlineColumn onlineUsers={onlineUsers} onPickUser={onPickUser} />
        <SignupsColumn users={newSignups} onPickUser={onPickUser} />
      </div>
    </section>
  );
}
