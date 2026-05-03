"use client";

import { BatteryCharging, Smartphone, Wifi } from "lucide-react";
import type { ReportDetailDTO } from "@/network/modules/internal/incidents/reports/types";
import {
  IncidentDetailKeyVal,
  IncidentDetailSection,
} from "./IncidentDetailSection";

export function IncidentDetailDevice({ detail }: { detail: ReportDetailDTO }) {
  const dev = detail.device_information;
  if (!dev) return null;

  const battery =
    dev.device_battery_level !== undefined && dev.device_battery_level !== null
      ? `${Math.round((dev.device_battery_level <= 1
          ? dev.device_battery_level * 100
          : dev.device_battery_level))}%`
      : "—";

  return (
    <IncidentDetailSection icon={Smartphone} title="Device & network">
      <div className="grid grid-cols-2 gap-3">
        <IncidentDetailKeyVal
          label="Device"
          value={
            [dev.device_manufacturer, dev.device_model].filter(Boolean).join(" ") ||
            "—"
          }
        />
        <IncidentDetailKeyVal
          label="OS"
          value={[dev.os, dev.os_version].filter(Boolean).join(" ") || "—"}
        />
        <IncidentDetailKeyVal
          label="App"
          value={
            dev.app_version
              ? `${dev.app_version}${dev.app_build ? ` (${dev.app_build})` : ""}`
              : "—"
          }
        />
        <IncidentDetailKeyVal
          label="Battery"
          value={
            <span className="inline-flex items-center gap-1.5">
              <BatteryCharging className="h-3 w-3 text-captionDark dark:text-captionDark-dark" />
              {battery}
              {dev.device_battery_status ? (
                <span className="text-captionDark dark:text-captionDark-dark">
                  · {dev.device_battery_status}
                </span>
              ) : null}
            </span>
          }
        />
        <IncidentDetailKeyVal
          label="Network"
          value={
            <span className="inline-flex items-center gap-1.5">
              <Wifi className="h-3 w-3 text-captionDark dark:text-captionDark-dark" />
              {[dev.network_type, dev.cellular_type].filter(Boolean).join(" / ") || "—"}
            </span>
          }
        />
        <IncidentDetailKeyVal label="Device ID" mono value={dev.device_id || "—"} />
      </div>
    </IncidentDetailSection>
  );
}
