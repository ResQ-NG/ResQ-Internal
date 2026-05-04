"use client";

import type { InternalUserRow } from "../_data/internal-users-dummy";
import { AppHeading, AppParagraph } from "@/components/ui";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark-dark">
        {label}
      </p>
      <p className="mt-0.5 text-sm text-primaryDark-dark">{value}</p>
    </div>
  );
}

export function InternalUserProfileSidebar({ user }: { user: InternalUserRow }) {
  return (
    <div className="flex flex-col gap-5 pb-2">
      <div className="flex items-start gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-primary-blue/40 to-primary-blue/10 text-base font-metropolis-bold text-white">
          {user.initials}
        </div>
        <div className="min-w-0 flex-1">
          <AppHeading as={2} size="sm" className="text-primaryDark-dark">
            {user.displayName}
          </AppHeading>
          <AppParagraph variant="caption" className="mt-1 text-xs text-captionDark-dark">
            {user.email}
          </AppParagraph>
          <div className="mt-2 flex flex-wrap gap-2">
            {user.online ? (
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-metropolis-bold uppercase tracking-wide text-emerald-100">
                Online
              </span>
            ) : (
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark-dark">
                Offline
              </span>
            )}
            {user.isNewSignup ? (
              <span className="rounded-full bg-primary-blue/25 px-2 py-0.5 text-[10px] font-metropolis-bold uppercase tracking-wide text-white">
                New · 7d
              </span>
            ) : null}
            {user.verifiedEmail ? (
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark-dark">
                Email verified
              </span>
            ) : (
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-metropolis-bold uppercase tracking-wide text-amber-100">
                Email unverified
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-3">
        <Field label="Phone" value={user.phone} />
        <Field label="Location" value={`${user.city}, ${user.state}, ${user.country}`} />
        <Field label="Last active" value={user.lastActiveLabel} />
        <Field label="Signed up" value={user.signedUpLabel} />
      </div>

      <div className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-3">
        <Field label="Platform" value={user.platform.toUpperCase()} />
        <Field label="App version" value={user.appVersion} />
        <Field label="Sessions (7d)" value={String(user.sessions7d)} />
        <Field
          label="Activity window"
          value={user.lastActiveWithin24h ? "Active in last 24h" : "Outside 24h window (demo)"}
        />
      </div>

      <AppParagraph variant="caption" className="text-xs text-captionDark-dark">
        Demo-only profile — use the header ✕ to close. Wire to your identity service for devices,
        sessions history, and risk flags.
      </AppParagraph>
    </div>
  );
}
