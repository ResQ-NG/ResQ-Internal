import { MediaIdentityBar } from "@/app/(media)/_components/MediaIdentityBar";
import { AppHeading, AppParagraph } from "@/components/ui";

const teams = [
  { name: "Breaking desk", status: "Investigating" },
  { name: "Feature stories", status: "In production" },
  { name: "Data investigations", status: "Exploring" },
  { name: "Regional bureau", status: "Monitoring" },
];

export default function MediaTeamsPage() {
  return (
    <div className="p-6 space-y-8">
      <MediaIdentityBar />
      <section className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
          <AppHeading as={2} size="sm" className="mb-2">
            Story teams
          </AppHeading>
          <AppParagraph variant="caption" className="mb-4">
            Organize newsroom teams around ResQ-driven stories. Replace this with
            real team data and collaboration tools.
          </AppParagraph>
          <div className="grid gap-4 md:grid-cols-2">
            {teams.map((team) => (
              <div
                key={team.name}
                className="flex flex-col rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10 px-4 py-3"
              >
                <span className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
                  {team.name}
                </span>
                <span className="mt-1 inline-flex w-fit rounded-full bg-success-green/15 px-2 py-[2px] text-[10px] font-metropolis-medium uppercase tracking-wider text-success-green">
                  {team.status}
                </span>
              </div>
            ))}
          </div>
        </section>
    </div>
  );
}

