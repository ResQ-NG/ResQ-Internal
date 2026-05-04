import { AppHeading, AppParagraph } from "@/components/ui";

type Stat = {
  key: string;
  label: string;
  value: string;
  hint: string;
};

export function AgencyStatCards({ stats }: { stats: readonly Stat[] }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((s) => (
        <div
          key={s.key}
          className="rounded-2xl border border-captionDark/20 bg-surface-light p-5 shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark"
        >
          <AppHeading as={2} size="sm" className="mb-1 text-captionDark dark:text-captionDark-dark">
            {s.label}
          </AppHeading>
          <p className="text-3xl font-metropolis-bold tracking-tight text-primaryDark dark:text-primaryDark-dark">
            {s.value}
          </p>
          <AppParagraph variant="caption" className="mt-2 leading-relaxed">
            {s.hint}
          </AppParagraph>
        </div>
      ))}
    </section>
  );
}
