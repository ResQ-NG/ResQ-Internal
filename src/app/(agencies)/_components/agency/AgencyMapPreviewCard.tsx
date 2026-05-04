import type { AgencyMapHotspot } from "@/app/(agencies)/_data/agency-dummy-data";
import { AppHeading, AppParagraph } from "@/components/ui";
import { agencySeverityDotClass } from "./agency-severity-styles";

export function AgencyMapPreviewCard({ hotspots }: { hotspots: AgencyMapHotspot[] }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <AppHeading as={2} size="sm" className="mb-4">
        Agency operations map
      </AppHeading>
      <div className="relative min-h-[min(18rem,40vh)] flex-1 overflow-hidden rounded-2xl border border-captionDark/15 bg-gradient-to-br from-primary-blue/[0.07] via-surface-light to-emerald-500/[0.06] dark:border-captionDark-dark/20 dark:from-primary-blue-dark/10 dark:via-primaryDark/30 dark:to-emerald-500/10">
        <div
          className="absolute inset-0 opacity-[0.14] dark:opacity-[0.18]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.35'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div className="absolute left-3 top-3 rounded-lg border border-white/40 bg-white/75 px-2 py-1 text-[10px] font-metropolis-semibold text-primaryDark shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-primaryDark/70 dark:text-primaryDark-dark">
          Demo overlay · Lagos metro
        </div>
        {hotspots.map((h) => (
          <div
            key={h.id}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5"
            style={{ left: `${h.xPct}%`, top: `${h.yPct}%` }}
          >
            <span
              className={agencySeverityDotClass(h.severity)}
              title={h.label}
              aria-label={h.label}
            />
            <span className="max-w-[4.5rem] truncate rounded bg-black/55 px-1 py-px text-[8px] font-metropolis-semibold text-white shadow-sm backdrop-blur-sm dark:bg-black/65">
              {h.label}
            </span>
          </div>
        ))}
      </div>
      <AppParagraph variant="caption" className="mt-3 text-xs leading-relaxed">
        Static preview for agency-scoped incidents. Wire to Mapbox later using the internal dashboard map stack.
      </AppParagraph>
    </div>
  );
}
