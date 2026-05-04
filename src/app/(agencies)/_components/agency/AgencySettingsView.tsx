import {
  AGENCY_SETTINGS_PROFILE_FIELDS,
  AGENCY_SETTINGS_ROUTING_SNIPPET,
  AGENCY_SETTINGS_STAFF_ROWS,
} from "@/app/(agencies)/_data/agency-dummy-data";
import { AppHeading, AppInput, AppParagraph } from "@/components/ui";

export function AgencySettingsView() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-captionDark/20 bg-surface-light p-5 shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
        <AppHeading as={2} size="sm" className="mb-1">
          Agency profile
        </AppHeading>
        <AppParagraph variant="caption" className="mb-4 text-xs">
          Read-only demo fields — swap for controlled forms when the agency API is ready.
        </AppParagraph>
        <div className="grid gap-4 sm:grid-cols-2">
          {AGENCY_SETTINGS_PROFILE_FIELDS.map((f) => (
            <label key={f.key} className="block space-y-1.5">
              <span className="text-[11px] font-metropolis-semibold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
                {f.label}
              </span>
              <AppInput readOnly value={f.value} className="text-sm" />
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-captionDark/20 bg-surface-light p-5 shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
        <AppHeading as={2} size="sm" className="mb-1">
          Routing rules
        </AppHeading>
        <AppParagraph variant="caption" className="mb-3 text-xs">
          Example rule narrative (static).
        </AppParagraph>
        <div className="rounded-xl border border-captionDark/15 bg-surface-light/90 px-4 py-3 text-sm leading-relaxed text-primaryDark dark:border-captionDark-dark/20 dark:bg-primaryDark/25 dark:text-primaryDark-dark">
          {AGENCY_SETTINGS_ROUTING_SNIPPET}
        </div>
      </section>

      <section className="rounded-2xl border border-captionDark/20 bg-surface-light p-5 shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
        <AppHeading as={2} size="sm" className="mb-1">
          Staff & permissions
        </AppHeading>
        <AppParagraph variant="caption" className="mb-4 text-xs">
          Demo directory — align columns with your RBAC model later.
        </AppParagraph>
        <div className="overflow-x-auto rounded-xl border border-captionDark/15 dark:border-captionDark-dark/20">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-captionDark/15 bg-surface-light/95 dark:border-captionDark-dark/20 dark:bg-primaryDark/40">
                <th className="px-4 py-2.5 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
                  Name
                </th>
                <th className="px-4 py-2.5 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
                  Role
                </th>
                <th className="px-4 py-2.5 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
                  Access
                </th>
              </tr>
            </thead>
            <tbody>
              {AGENCY_SETTINGS_STAFF_ROWS.map((row) => (
                <tr
                  key={row.name}
                  className="border-b border-captionDark/10 last:border-0 dark:border-captionDark-dark/10"
                >
                  <td className="px-4 py-2.5 font-metropolis-medium text-primaryDark dark:text-primaryDark-dark">
                    {row.name}
                  </td>
                  <td className="px-4 py-2.5 text-captionDark dark:text-captionDark-dark">{row.role}</td>
                  <td className="px-4 py-2.5 text-xs text-primary-blue dark:text-primary-blue-dark">{row.access}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
