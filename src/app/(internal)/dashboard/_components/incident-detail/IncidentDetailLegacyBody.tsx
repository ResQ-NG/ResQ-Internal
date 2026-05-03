"use client";

import { Clock, MapPin, Phone, Play, Route, Tag, User } from "lucide-react";
import type { SampleInboxRow } from "../sampleCommandData";
import { IncidentDetailSection } from "./IncidentDetailSection";
import { MetaRow } from "./MetaRow";
import { TripStat } from "./TripStat";

/** Legacy rendering for sample/demo rows (non-API rows e.g. Watch Me / SOS demo). */
export function IncidentDetailLegacyBody({ row }: { row: SampleInboxRow }) {
  return (
    <>
      <IncidentDetailSection icon={MapPin} title="Incident details">
        <div className="grid grid-cols-1 gap-2.5">
          <MetaRow icon={Clock} label="Received" value={row.created} />
          {row.locationLabel ? (
            <MetaRow icon={MapPin} label="Location" value={row.locationLabel} />
          ) : null}
          {row.reporterName ? (
            <MetaRow icon={User} label="Reporter" value={row.reporterName} />
          ) : null}
          {row.phone ? (
            <MetaRow icon={Phone} label="Phone" value={row.phone} />
          ) : null}
        </div>
      </IncidentDetailSection>

      {row.trip ? (
        <IncidentDetailSection icon={Route} title="Trip details">
          <div className="grid grid-cols-2 gap-2">
            <TripStat label="Start time" value={row.trip.startTime} />
            <TripStat label="Duration" value={`${row.trip.durationMin} min`} />
            <TripStat label="Distance" value={`${row.trip.distanceKm} km`} />
            <TripStat label="Check-ins" value={`${row.trip.checkIns}`} />
          </div>
        </IncidentDetailSection>
      ) : null}

      {row.media && row.media.length > 0 ? (
        <IncidentDetailSection
          icon={Tag}
          title={`Media uploaded (${row.media.length})`}
        >
          <div className="grid grid-cols-2 gap-2">
            {row.media.map((m) => (
              <div
                key={m.id}
                className="group relative overflow-hidden rounded-xl border border-captionDark/15 bg-captionDark/5 dark:border-captionDark-dark/20 dark:bg-captionDark-dark/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.url}
                  alt={m.caption}
                  className="h-24 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {m.type === "video" ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-lg">
                      <Play className="h-4 w-4 fill-primaryDark text-primaryDark" />
                    </div>
                  </div>
                ) : null}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 px-2 pb-1.5 pt-4">
                  <p className="truncate text-[10px] font-medium text-white">
                    {m.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </IncidentDetailSection>
      ) : null}
    </>
  );
}
