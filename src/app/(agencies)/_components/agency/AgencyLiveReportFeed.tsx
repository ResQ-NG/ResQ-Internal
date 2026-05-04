import type { AgencyLiveFeedItem } from "@/app/(agencies)/_data/agency-dummy-data";
import { AppHeading, AppParagraph } from "@/components/ui";
import { agencySeverityPillClass } from "./agency-severity-styles";

export function AgencyLiveReportFeed({ items }: { items: AgencyLiveFeedItem[] }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <AppHeading as={2} size="sm" className="mb-4">
        Live report feed
      </AppHeading>
      <ul className="flex max-h-[min(22rem,52vh)] flex-col gap-2 overflow-y-auto overscroll-contain pr-1">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-xl border border-captionDark/12 bg-surface-light/90 px-3 py-2.5 transition-colors hover:border-primary-blue/25 hover:bg-primary-blue/[0.03] dark:border-captionDark-dark/15 dark:bg-primaryDark/20 dark:hover:border-primary-blue-dark/25"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-metropolis-semibold leading-snug text-primaryDark dark:text-primaryDark-dark">
                  {item.title}
                </p>
                <AppParagraph variant="caption" className="mt-1 line-clamp-1 text-xs">
                  {item.location}
                </AppParagraph>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span className={agencySeverityPillClass(item.severity)}>{item.severity}</span>
                  <span className="text-[10px] font-medium uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
                    {item.category}
                  </span>
                </div>
              </div>
              <span className="shrink-0 text-[10px] font-metropolis-semibold text-captionDark dark:text-captionDark-dark">
                {item.timeLabel}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
