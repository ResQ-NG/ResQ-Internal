"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Clock,
  FileText,
  MapPin,
  Phone,
  Play,
  Radio,
  Route,
  Tag,
  User,
  UserCheck,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { incidentProcessTextClass, type SampleInboxRow } from "./sampleCommandData";

type IncidentDetailCardProps = {
  row: SampleInboxRow;
  onBack?: () => void;
  onClose?: () => void;
  embedded?: boolean;
};

export function IncidentDetailCard({ row, onBack, onClose, embedded = false }: IncidentDetailCardProps) {
  const [categorizing, setCategorizing] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const isWatchMe = row.kind === "sos" || row.isWatchMe;

  const handleCategorize = () => {
    setCategorizing(true);
    setTimeout(() => setCategorizing(false), 1800);
  };

  const handleAssign = () => {
    setAssigning(true);
    setTimeout(() => setAssigning(false), 1800);
  };

  return (
    <div
      className={cn(
        "flex min-h-0 flex-col gap-0 overflow-y-auto",
        embedded
          ? "h-full"
          : "rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark shadow-sm",
      )}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 shrink-0 border-b border-captionDark/10 dark:border-captionDark-dark/15 bg-surface-light dark:bg-surface-dark px-4 py-3">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-captionDark transition-colors hover:bg-captionDark/10 hover:text-primaryDark dark:text-captionDark-dark dark:hover:bg-captionDark-dark/15 dark:hover:text-primaryDark-dark"
              aria-label="Back to list"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
                isWatchMe
                  ? "bg-accent-red/12 text-accent-red dark:text-accent-red-dark"
                  : "bg-primary-blue/10 text-primary-blue dark:text-primary-blue-dark",
              )}
            >
              {isWatchMe ? <Radio className="h-4 w-4" strokeWidth={2} /> : <FileText className="h-4 w-4" strokeWidth={2} />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span
                  className={cn(
                    "rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                    isWatchMe
                      ? "bg-accent-red/15 text-accent-red dark:text-accent-red-dark"
                      : "bg-primary-blue/12 text-primary-blue dark:text-primary-blue-dark",
                  )}
                >
                  {isWatchMe ? "Watch Me / SOS" : "Report"}
                </span>
                <span className="text-[11px] text-captionDark dark:text-captionDark-dark font-mono">#{row.id}</span>
              </div>
            </div>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-captionDark transition-colors hover:bg-captionDark/10 hover:text-primaryDark dark:text-captionDark-dark dark:hover:bg-captionDark-dark/15 dark:hover:text-primaryDark-dark"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto px-4 py-4">
        {/* Summary */}
        <div>
          <p className="text-sm font-metropolis-semibold leading-snug text-primaryDark dark:text-primaryDark-dark">
            {row.summary}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {row.category === null ? (
              <span className="rounded-md bg-amber-500/12 px-2 py-0.5 text-[11px] font-medium text-amber-900 dark:text-amber-100">
                Uncategorized
              </span>
            ) : (
              <span className="rounded-md bg-captionDark/10 px-2 py-0.5 text-[11px] text-captionDark dark:bg-captionDark-dark/15 dark:text-captionDark-dark">
                {row.category}
              </span>
            )}
            <span className={cn("text-[11px] font-medium capitalize", incidentProcessTextClass(row.process))}>
              {row.process}
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-1 gap-2.5">
          <MetaRow icon={Clock} label="Received" value={row.created} />
          {row.locationLabel && <MetaRow icon={MapPin} label="Location" value={row.locationLabel} />}
          {row.reporterName && <MetaRow icon={User} label="Reporter" value={row.reporterName} />}
          {row.phone && <MetaRow icon={Phone} label="Phone" value={row.phone} />}
        </div>

        {/* Trip info (Watch Me only) */}
        {row.trip && (
          <div className="rounded-xl border border-captionDark/15 dark:border-captionDark-dark/20 bg-primary-blue/10 dark:bg-primary-blue-dark/15 p-3.5">
            <div className="mb-2.5 flex items-center gap-2">
              <Route className="h-3.5 w-3.5 text-primary-blue dark:text-primary-blue-dark" />
              <span className="text-[11px] font-metropolis-semibold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
                Trip details
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <TripStat label="Start time" value={row.trip.startTime} />
              <TripStat label="Duration" value={`${row.trip.durationMin} min`} />
              <TripStat label="Distance" value={`${row.trip.distanceKm} km`} />
              <TripStat label="Check-ins" value={`${row.trip.checkIns}`} />
            </div>
          </div>
        )}

        {/* Media */}
        {row.media && row.media.length > 0 && (
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Tag className="h-3.5 w-3.5 text-captionDark dark:text-captionDark-dark" />
              <span className="text-[11px] font-metropolis-semibold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
                Media uploaded ({row.media.length})
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {row.media.map((m) => (
                <div
                  key={m.id}
                  className="group relative overflow-hidden rounded-xl border border-captionDark/15 dark:border-captionDark-dark/20 bg-captionDark/5 dark:bg-captionDark-dark/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.url}
                    alt={m.caption}
                    className="h-24 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {m.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-lg">
                        <Play className="h-4 w-4 fill-primaryDark text-primaryDark" />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 px-2 pb-1.5 pt-4">
                    <p className="truncate text-[10px] font-medium text-white">{m.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-1">
          {row.category === null && (
            <button
              type="button"
              onClick={handleCategorize}
              disabled={categorizing}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-blue to-primary-blue-dark px-4 py-2.5 text-sm font-metropolis-semibold text-white shadow-md transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
              )}
            >
              <Tag className="h-4 w-4" />
              {categorizing ? "Opening categorization…" : "Categorize this report →"}
            </button>
          )}
          <button
            type="button"
            onClick={handleAssign}
            disabled={assigning}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-captionDark/25 px-4 py-2.5 text-sm font-metropolis-semibold text-primaryDark transition-all duration-200 hover:border-primary-blue/40 hover:bg-primary-blue/[0.06] hover:text-primary-blue dark:border-captionDark-dark/30 dark:text-primaryDark-dark dark:hover:border-primary-blue-dark/45 dark:hover:bg-primary-blue-dark/10 dark:hover:text-primary-blue-dark active:scale-[0.98] disabled:opacity-60"
          >
            <UserCheck className="h-4 w-4" />
            {assigning ? "Opening assignment…" : "Assign to agent"}
          </button>
        </div>
      </div>
    </div>
  );
}

function MetaRow({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5 text-xs">
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-captionDark dark:text-captionDark-dark" />
      <span className="w-16 shrink-0 text-captionDark dark:text-captionDark-dark">{label}</span>
      <span className="min-w-0 font-metropolis-medium text-primaryDark dark:text-primaryDark-dark">{value}</span>
    </div>
  );
}

function TripStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface-light dark:bg-surface-dark px-2.5 py-2">
      <p className="text-[10px] text-captionDark dark:text-captionDark-dark">{label}</p>
      <p className="mt-0.5 text-xs font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">{value}</p>
    </div>
  );
}
