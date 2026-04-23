"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Layers3,
  MapPinned,
  Radio,
} from "lucide-react";
import { AppHeading, AppLink, AppParagraph } from "@/components/ui";
import { cn } from "@/lib/utils";
import { getMapboxStyleUrl } from "@/lib/mapbox-env";
import { AdminMediaOnAirStrip } from "./AdminMediaOnAirStrip";
import {
  COMMAND_STAT_KEYS,
  CommandCenterStatsPanel,
  type CommandStatKey,
} from "./CommandCenterStatsPanel";
import { IncomingReportsSosPanel } from "./IncomingReportsSosPanel";
import {
  MAP_SIDEBAR_LEFT,
  MAP_SIDEBAR_RIGHT,
  SidebarResizeGrip,
  useLgUp,
} from "./MapSidebarResizeGrip";
import { type MapStyleId } from "./mapSampleGeo";
import { ResQMapboxCanvas } from "./ResQMapboxCanvas";
import { sampleInboxAttentionCount } from "./sampleCommandData";

const STYLE_OPTIONS: { id: MapStyleId; label: string }[] = [
  { id: "streets", label: "Streets" },
  { id: "outdoors", label: "Outdoors" },
  { id: "navigation-day", label: "Navigation Day" },
  { id: "navigation-night", label: "Navigation Night" },
  { id: "satellite", label: "Satellite" },
];

export type MapWorkspaceShellProps = {
  /** Shown on media strip (e.g. header date line). */
  dateRange?: string;
};

export function MapWorkspaceShell({
  dateRange = "Live command window",
}: MapWorkspaceShellProps) {
  const lgUp = useLgUp();
  const [mapStyleId, setMapStyleId] = useState<MapStyleId>("streets");
  const [layers, setLayers] = useState({
    projects: true,
    team: true,
    incidents: true,
  });

  const [leftOpen, setLeftOpen] = useState(true);
  const [leftWidth, setLeftWidth] = useState<number>(MAP_SIDEBAR_LEFT.default);
  const [showMedia, setShowMedia] = useState(true);
  const [showStats, setShowStats] = useState(true);
  const [statKeys, setStatKeys] = useState<CommandStatKey[]>([
    ...COMMAND_STAT_KEYS,
  ]);

  const [inboxOpen, setInboxOpen] = useState(true);
  const [rightWidth, setRightWidth] = useState<number>(
    MAP_SIDEBAR_RIGHT.default
  );

  const attentionCount = sampleInboxAttentionCount();

  const leftStyle =
    lgUp && leftOpen
      ? ({
          width: leftWidth,
          minWidth: MAP_SIDEBAR_LEFT.min,
          maxWidth: MAP_SIDEBAR_LEFT.max,
        } as const)
      : undefined;
  const rightStyle =
    lgUp && inboxOpen
      ? ({
          width: rightWidth,
          minWidth: MAP_SIDEBAR_RIGHT.min,
          maxWidth: MAP_SIDEBAR_RIGHT.max,
        } as const)
      : undefined;

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-2xl border border-captionDark/20 bg-surface-light shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark lg:min-h-[calc(100dvh-8.25rem)] lg:flex-row">
      {/* Left — map style, layers, ops (media + stats) */}
      <div
        className={cn(
          "relative hidden shrink-0 flex-col overflow-hidden border-captionDark/20 transition-[width] duration-300 ease-out dark:border-captionDark-dark/20 lg:flex lg:min-h-0",
          leftOpen
            ? "border-b lg:border-b-0 lg:border-r"
            : "lg:w-12 lg:min-w-12 lg:max-w-12 lg:border-r"
        )}
        style={leftStyle}
      >
        {leftOpen && (
          <>
            <button
              type="button"
              onClick={() => setLeftOpen(false)}
              title="Hide command sidebar"
              aria-label="Hide command sidebar"
              className="absolute right-1 top-1/2 z-[560] hidden h-[4.75rem] w-10 -translate-y-1/2 translate-x-1/2 flex-col items-center justify-center gap-1 rounded-xl border border-captionDark/20 bg-surface-light/98 py-2.5 shadow-md backdrop-blur-md transition-colors hover:border-primary-blue/40 hover:bg-primary-blue/[0.07] dark:border-captionDark-dark/25 dark:bg-surface-dark/98 dark:hover:border-primary-blue-dark/45 dark:hover:bg-primary-blue-dark/10 lg:flex"
            >
              <ChevronLeft
                className="h-4 w-4 text-primary-blue dark:text-primary-blue-dark"
                strokeWidth={2.25}
                aria-hidden
              />
              <span className="select-none text-[9px] font-metropolis-semibold uppercase leading-tight tracking-[0.14em] text-captionDark dark:text-captionDark-dark">
                Hide
              </span>
            </button>
            <SidebarResizeGrip
              ariaLabel="Resize command sidebar"
              side="left"
              width={leftWidth}
              min={MAP_SIDEBAR_LEFT.min}
              max={MAP_SIDEBAR_LEFT.max}
              onWidthChange={setLeftWidth}
            />
          </>
        )}

        {!leftOpen && (
          <button
            type="button"
            onClick={() => setLeftOpen(true)}
            title="Show command sidebar"
            aria-label="Show command sidebar"
            className="absolute right-0 top-1/2 z-[560] flex h-[4.75rem] w-full max-w-12 translate-x-1/2 flex-col items-center justify-center gap-1 rounded-xl border border-captionDark/20 bg-surface-light/98 py-2.5 shadow-md backdrop-blur-md transition-colors hover:border-primary-blue/40 hover:bg-primary-blue/[0.07] dark:border-captionDark-dark/25 dark:bg-surface-dark/98 dark:hover:border-primary-blue-dark/45 dark:hover:bg-primary-blue-dark/10"
          >
            <Layers3
              className="h-4 w-4 text-primary-blue dark:text-primary-blue-dark"
              strokeWidth={2.25}
              aria-hidden
            />
            <span className="select-none text-[9px] font-metropolis-semibold uppercase leading-tight tracking-[0.14em] text-captionDark dark:text-captionDark-dark">
              Ops
            </span>
          </button>
        )}

        <div
          className={cn(
            "flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5 md:gap-6 md:p-6",
            leftOpen && "lg:pr-11",
            !leftOpen && "hidden"
          )}
        >
          <div>
            <div className="mb-3 flex items-center gap-2 text-primaryDark dark:text-primaryDark-dark">
              <Layers3
                className="h-4 w-4 text-primary-blue dark:text-primary-blue-dark"
                aria-hidden
              />
              <AppHeading as={2} size="sm">
                Map style
              </AppHeading>
            </div>
            <div className="flex flex-wrap gap-2">
              {STYLE_OPTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMapStyleId(id)}
                  className={cn(
                    "rounded-xl border px-3.5 py-2 text-xs font-medium transition-colors",
                    mapStyleId === id
                      ? "border-primary-blue bg-primary-blue/10 text-primary-blue dark:border-primary-blue-dark dark:bg-primary-blue-dark/15 dark:text-primary-blue-dark"
                      : "border-captionDark/20 text-captionDark hover:border-captionDark/40 dark:border-captionDark-dark/30 dark:text-captionDark-dark"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            <AppParagraph
              variant="caption"
              size="sm"
              className="mt-3 leading-relaxed"
            >
              Active style:{" "}
              <span className="break-all font-mono text-[10px]">
                {getMapboxStyleUrl(mapStyleId)}
              </span>
            </AppParagraph>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2 text-primaryDark dark:text-primaryDark-dark">
              <MapPinned
                className="h-4 w-4 text-primary-blue dark:text-primary-blue-dark"
                aria-hidden
              />
              <AppHeading as={2} size="sm">
                Map layers
              </AppHeading>
            </div>
            <div className="flex flex-col gap-2.5 text-sm text-primaryDark dark:text-primaryDark-dark">
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-transparent px-1 py-1 hover:border-captionDark/15 hover:bg-captionDark/[0.04] dark:hover:border-captionDark-dark/20 dark:hover:bg-captionDark-dark/10">
                <input
                  type="checkbox"
                  checked={layers.projects}
                  onChange={() =>
                    setLayers((s) => ({ ...s, projects: !s.projects }))
                  }
                  className="h-4 w-4 rounded border-captionDark/40 text-primary-blue focus:ring-primary-blue dark:border-captionDark-dark/50"
                />
                <span>Incidents by project</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-transparent px-1 py-1 hover:border-captionDark/15 hover:bg-captionDark/[0.04] dark:hover:border-captionDark-dark/20 dark:hover:bg-captionDark-dark/10">
                <input
                  type="checkbox"
                  checked={layers.team}
                  onChange={() => setLayers((s) => ({ ...s, team: !s.team }))}
                  className="h-4 w-4 rounded border-captionDark/40 text-primary-blue focus:ring-primary-blue dark:border-captionDark-dark/50"
                />
                <span>Team activity</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-transparent px-1 py-1 hover:border-captionDark/15 hover:bg-captionDark/[0.04] dark:hover:border-captionDark-dark/20 dark:hover:bg-captionDark-dark/10">
                <input
                  type="checkbox"
                  checked={layers.incidents}
                  onChange={() =>
                    setLayers((s) => ({ ...s, incidents: !s.incidents }))
                  }
                  className="h-4 w-4 rounded border-captionDark/40 text-primary-blue focus:ring-primary-blue dark:border-captionDark-dark/50"
                />
                <span>Open reports / SOS on map</span>
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-captionDark/15 bg-surface-light/90 p-4 dark:border-captionDark-dark/20 dark:bg-primaryDark/35">
            <div className="mb-2 flex items-center gap-2 text-primaryDark dark:text-primaryDark-dark">
              <Radio
                className="h-4 w-4 shrink-0 text-primary-blue dark:text-primary-blue-dark"
                aria-hidden
              />
              <p className="text-xs font-metropolis-semibold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
                Command column
              </p>
            </div>
            <p className="mb-3 text-xs leading-relaxed text-captionDark dark:text-captionDark-dark">
              Toggle panels in this sidebar. Resize the column from the grip.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowMedia((v) => !v)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  showMedia
                    ? "bg-primary-blue/15 text-primary-blue dark:bg-primary-blue-dark/20 dark:text-primary-blue-dark"
                    : "bg-captionDark/10 text-captionDark dark:bg-captionDark-dark/15 dark:text-captionDark-dark"
                )}
              >
                Media on air
              </button>
              <button
                type="button"
                onClick={() => setShowStats((v) => !v)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  showStats
                    ? "bg-primary-blue/15 text-primary-blue dark:bg-primary-blue-dark/20 dark:text-primary-blue-dark"
                    : "bg-captionDark/10 text-captionDark dark:bg-captionDark-dark/15 dark:text-captionDark-dark"
                )}
              >
                Live stats
              </button>
            </div>
          </div>

          {showMedia ? (
            <AdminMediaOnAirStrip dateRange={dateRange} variant="embedded" />
          ) : null}

          {showStats ? (
            <div className="rounded-2xl border border-captionDark/15 bg-surface-light/90 p-4 shadow-sm backdrop-blur-md dark:border-captionDark-dark/20 dark:bg-primaryDark/40">
              <CommandCenterStatsPanel
                layout="sidebar"
                visibleKeys={statKeys}
                configurable
                onVisibleKeysChange={setStatKeys}
              />
            </div>
          ) : null}

          <div className="mt-auto flex flex-col gap-2 border-t border-captionDark/15 pt-5 dark:border-captionDark-dark/20">
            <AppLink href="/overview" variant="muted" className="text-xs">
              ← Command Center overview
            </AppLink>
            <AppLink
              href="/dashboard/incidents"
              variant="primary"
              className="text-xs"
            >
              Open incidents queue →
            </AppLink>
          </div>
        </div>
      </div>

      {/* Center — map */}
      <div className="relative min-h-[min(64dvh,560px)] w-full min-w-0 flex-1 lg:min-h-0">
        <ResQMapboxCanvas
          variant="workspace"
          mapStyleId={mapStyleId}
          visibleLayers={layers}
          className="h-full min-h-[inherit]"
        />
      </div>

      {/* Right — inbox / incidents */}
      <div
        className={cn(
          "relative flex min-h-0 shrink-0 flex-col overflow-hidden border-t border-captionDark/20 transition-[width] duration-300 ease-out dark:border-captionDark-dark/20 lg:border-t-0 lg:border-l",
          inboxOpen
            ? "max-h-[70vh] w-full lg:h-full lg:max-h-none"
            : "w-full lg:h-full lg:w-12 lg:min-w-12 lg:max-w-12 lg:max-h-none"
        )}
        style={rightStyle}
      >
        {inboxOpen && (
          <>
            <button
              type="button"
              onClick={() => setInboxOpen(false)}
              className="flex w-full flex-col items-center gap-1.5 border-b border-captionDark/10 bg-surface-light/95 py-3 text-captionDark transition-colors hover:bg-captionDark/5 dark:border-captionDark-dark/15 dark:bg-surface-dark/95 dark:hover:bg-captionDark-dark/10 lg:hidden"
              aria-label="Hide inbox"
            >
              <span className="h-1 w-12 rounded-full bg-captionDark/25 dark:bg-captionDark-dark/35" />
              <span className="text-xs font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
                Hide inbox
              </span>
              <ChevronRight className="h-4 w-4 opacity-70" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setInboxOpen(false)}
              title="Hide inbox"
              aria-label="Hide inbox panel"
              className="absolute left-2 top-1/2 z-[560] hidden h-[4.75rem] w-10 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-xl border border-captionDark/20 bg-surface-light/98 py-2.5 shadow-md backdrop-blur-md transition-colors hover:border-primary-blue/40 hover:bg-primary-blue/[0.07] dark:border-captionDark-dark/25 dark:bg-surface-dark/98 dark:hover:border-primary-blue-dark/45 dark:hover:bg-primary-blue-dark/10 lg:flex"
            >
              <ChevronRight
                className="h-4 w-4 text-primary-blue dark:text-primary-blue-dark"
                strokeWidth={2.25}
                aria-hidden
              />
              <span className="select-none text-[9px] font-metropolis-semibold uppercase leading-tight tracking-[0.14em] text-captionDark dark:text-captionDark-dark">
                Hide
              </span>
            </button>
            {lgUp ? (
              <SidebarResizeGrip
                ariaLabel="Resize incidents sidebar"
                side="right"
                width={rightWidth}
                min={MAP_SIDEBAR_RIGHT.min}
                max={MAP_SIDEBAR_RIGHT.max}
                onWidthChange={setRightWidth}
              />
            ) : null}
          </>
        )}

        {!inboxOpen && (
          <button
            type="button"
            onClick={() => setInboxOpen(true)}
            title={
              attentionCount > 0
                ? `Inbox — ${attentionCount} need attention`
                : "Show inbox"
            }
            aria-label={
              attentionCount > 0
                ? `Show inbox, ${attentionCount} need attention`
                : "Show inbox"
            }
            className="absolute left-1/2 top-1/2 z-[560] hidden h-[4.75rem] w-10 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-xl border border-captionDark/20 bg-surface-light/98 py-2.5 shadow-md backdrop-blur-md transition-colors hover:border-primary-blue/40 hover:bg-primary-blue/[0.07] dark:border-captionDark-dark/25 dark:bg-surface-dark/98 dark:hover:border-primary-blue-dark/45 dark:hover:bg-primary-blue-dark/10 lg:flex"
          >
            {attentionCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-surface-light bg-accent-red px-1 text-[10px] font-bold leading-none text-white shadow-md ring-2 ring-accent-red/30 dark:border-surface-dark">
                {attentionCount > 9 ? "9+" : attentionCount}
              </span>
            ) : (
              <span
                className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-captionDark/40 ring-2 ring-surface-light dark:bg-captionDark-dark/50 dark:ring-surface-dark"
                aria-hidden
              />
            )}
            <ChevronLeft
              className="h-4 w-4 text-primary-blue dark:text-primary-blue-dark"
              strokeWidth={2.25}
              aria-hidden
            />
            <span className="select-none text-[9px] font-metropolis-semibold uppercase leading-tight tracking-[0.14em] text-captionDark dark:text-captionDark-dark">
              Inbox
            </span>
          </button>
        )}

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <IncomingReportsSosPanel
            embedded
            collapsed={!inboxOpen}
            onToggleCollapse={() => setInboxOpen((o) => !o)}
          />
        </div>
      </div>
    </div>
  );
}
