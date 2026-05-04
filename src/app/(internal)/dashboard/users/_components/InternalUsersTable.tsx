import type { InternalUserRow } from "../_data/internal-users-dummy";
import { cn } from "@/lib/utils/generics";

export function InternalUsersTable({
  rows,
  onRowClick,
}: {
  rows: InternalUserRow[];
  onRowClick: (u: InternalUserRow) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-captionDark/15 dark:border-captionDark-dark/20">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-captionDark/15 bg-surface-light/95 dark:border-captionDark-dark/20 dark:bg-primaryDark/40">
            <th className="w-14 px-3 py-3 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
              <span className="sr-only">Avatar</span>
            </th>
            <th className="px-3 py-3 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
              User
            </th>
            <th className="px-3 py-3 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
              State
            </th>
            <th className="px-3 py-3 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
              Presence
            </th>
            <th className="px-3 py-3 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
              Last active
            </th>
            <th className="px-3 py-3 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
              Platform
            </th>
            <th className="px-3 py-3 text-right text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
              7d sessions
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((u) => (
            <tr
              key={u.id}
              className={cn(
                "cursor-pointer border-b border-captionDark/10 transition-colors",
                "hover:bg-captionDark/[0.05] dark:border-captionDark-dark/10 dark:hover:bg-captionDark-dark/[0.07]"
              )}
              onClick={() => onRowClick(u)}
            >
              <td className="px-3 py-2 align-middle">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-captionDark/12 bg-gradient-to-br from-primary-blue/18 to-primary-blue/5 text-[11px] font-metropolis-bold text-primary-blue dark:border-captionDark-dark/20 dark:from-primary-blue-dark/25 dark:to-primary-blue-dark/5 dark:text-primary-blue-dark">
                  {u.initials}
                  {u.online ? (
                    <span
                      className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface-light bg-emerald-500 dark:border-surface-dark"
                      aria-hidden
                    />
                  ) : null}
                </span>
              </td>
              <td className="px-3 py-2 align-middle">
                <span className="block font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
                  {u.displayName}
                </span>
                <span className="block max-w-[220px] truncate text-[11px] text-captionDark dark:text-captionDark-dark">
                  {u.email}
                </span>
              </td>
              <td className="px-3 py-2 text-xs text-captionDark dark:text-captionDark-dark">{u.state}</td>
              <td className="px-3 py-2">
                {u.online ? (
                  <span className="inline-flex rounded-full bg-emerald-500/12 px-2 py-0.5 text-[10px] font-metropolis-bold uppercase tracking-wide text-emerald-800 dark:bg-emerald-400/12 dark:text-emerald-100">
                    Online
                  </span>
                ) : (
                  <span className="inline-flex rounded-full bg-captionDark/10 px-2 py-0.5 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:bg-captionDark-dark/15 dark:text-captionDark-dark">
                    Offline
                  </span>
                )}
              </td>
              <td className="px-3 py-2 text-xs text-captionDark dark:text-captionDark-dark">{u.lastActiveLabel}</td>
              <td className="px-3 py-2 text-xs font-medium uppercase text-primaryDark dark:text-primaryDark-dark">
                {u.platform}
              </td>
              <td className="px-3 py-2 text-right font-mono text-xs text-primaryDark dark:text-primaryDark-dark">
                {u.sessions7d}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
