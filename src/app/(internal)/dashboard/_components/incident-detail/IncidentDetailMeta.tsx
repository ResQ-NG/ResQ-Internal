"use client";

import { Clock, Compass, MapPin, User } from "lucide-react";
import type { ReportDetailDTO } from "@/network/modules/internal/incidents/reports/types";
import {
  IncidentDetailKeyVal,
  IncidentDetailSection,
} from "./IncidentDetailSection";
import {
  formatDateTime,
  formatLatLng,
  formatLocation,
} from "./incident-detail.helpers";
import { formatRelativeShort } from "@/lib/utils/generics";
import type { SampleInboxRow } from "../sampleCommandData";

export function IncidentDetailMeta({
  row,
  detail,
}: {
  row: SampleInboxRow;
  detail?: ReportDetailDTO | null;
}) {
  const reporterId = detail
    ? detail.is_anonymous
      ? "Anonymous"
      : detail.reporter_id
        ? `#${detail.reporter_id}`
        : row.reporterName ?? "—"
    : row.reporterName ?? "—";

  const incidentDateTime = detail?.incident_datetime
    ? formatDateTime(detail.incident_datetime)
    : row.created;
  const lastEventAt = detail?.processing?.last_event_at
    ? formatRelativeShort(detail.processing.last_event_at)
    : null;
  const createdAt = detail?.created_at ? formatDateTime(detail.created_at) : null;

  return (
    <IncidentDetailSection icon={MapPin} title="Incident details">
      <div className="grid grid-cols-2 gap-3">
        <IncidentDetailKeyVal label="Incident time" value={incidentDateTime} />
        {createdAt ? (
          <IncidentDetailKeyVal label="Reported" value={createdAt} />
        ) : null}
        {lastEventAt ? (
          <IncidentDetailKeyVal
            label="Last AI event"
            value={
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-captionDark dark:text-captionDark-dark" />
                {lastEventAt}
              </span>
            }
          />
        ) : null}
        <IncidentDetailKeyVal
          label="Reporter"
          value={
            <span className="inline-flex items-center gap-1.5">
              <User className="h-3 w-3 text-captionDark dark:text-captionDark-dark" />
              {reporterId}
            </span>
          }
        />
        <IncidentDetailKeyVal
          label="Location"
          value={detail ? formatLocation(detail.location) : row.locationLabel ?? "—"}
        />
        {detail?.location ? (
          <IncidentDetailKeyVal
            label="Coordinates"
            mono
            value={
              <span className="inline-flex items-center gap-1.5">
                <Compass className="h-3 w-3 text-captionDark dark:text-captionDark-dark" />
                {formatLatLng(detail.location.latitude, detail.location.longitude)}
              </span>
            }
          />
        ) : null}
      </div>
    </IncidentDetailSection>
  );
}
