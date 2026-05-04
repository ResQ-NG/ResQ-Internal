/**
 * Demo payload for internal dashboard · Agencies — replace with API integration.
 */

export type InternalAgencyStatus = "active" | "pilot" | "suspended";

export type InternalAgencyRow = {
  id: string;
  /** Shown in logo placeholder until real assets exist */
  logoInitials: string;
  code: string;
  name: string;
  jurisdiction: string;
  branches: number;
  openTickets: number;
  leadContact: string;
  status: InternalAgencyStatus;
  updatedLabel: string;
};

export type InternalAgencyBranchHotspot = {
  id: string;
  /** Parent main branch / footprint group */
  primaryId: string;
  label: string;
  xPct: number;
  yPct: number;
  tickets: number;
  role: "hub" | "satellite";
};

export type InternalPrimaryBranch = {
  id: string;
  /** Searchable dropdown label */
  label: string;
  agencyName: string;
  hotspots: InternalAgencyBranchHotspot[];
};

export const INTERNAL_AGENCIES: InternalAgencyRow[] = [
  {
    id: "ag-na",
    logoInitials: "NS",
    code: "NSA",
    name: "National Safety Agency",
    jurisdiction: "Lagos · Ogun · Oyo",
    branches: 6,
    openTickets: 47,
    leadContact: "ops@nsa.demo",
    status: "active",
    updatedLabel: "2 hr ago",
  },
  {
    id: "ag-lrc",
    logoInitials: "LR",
    code: "LRC",
    name: "Lagos Response Command",
    jurisdiction: "Lagos metro",
    branches: 11,
    openTickets: 89,
    leadContact: "dispatch@lrc.demo",
    status: "active",
    updatedLabel: "18 min ago",
  },
  {
    id: "ag-ner",
    logoInitials: "NE",
    code: "NERC",
    name: "North-East Relief Coordination",
    jurisdiction: "Borno · Adamawa · Yobe",
    branches: 4,
    openTickets: 31,
    leadContact: "field@nerc.demo",
    status: "active",
    updatedLabel: "Yesterday",
  },
  {
    id: "ag-delta",
    logoInitials: "DP",
    code: "DPC",
    name: "Delta Port Consortium",
    jurisdiction: "Delta · Rivers coast",
    branches: 2,
    openTickets: 12,
    leadContact: "pilot@dpc.demo",
    status: "pilot",
    updatedLabel: "3 days ago",
  },
  {
    id: "ag-south",
    logoInitials: "SS",
    code: "SRC",
    name: "South-South Hazmat desk",
    jurisdiction: "Rivers · Bayelsa",
    branches: 3,
    openTickets: 0,
    leadContact: "review@src.demo",
    status: "suspended",
    updatedLabel: "2 weeks ago",
  },
  {
    id: "ag-fct",
    logoInitials: "FC",
    code: "FCT",
    name: "Federal Capital Territorial Watch",
    jurisdiction: "FCT · Niger rim",
    branches: 5,
    openTickets: 24,
    leadContact: "fct.ops@demo",
    status: "active",
    updatedLabel: "6 hr ago",
  },
  {
    id: "ag-kano",
    logoInitials: "KN",
    code: "KRC",
    name: "Kano Regional Coordination",
    jurisdiction: "Kano · Jigawa",
    branches: 4,
    openTickets: 18,
    leadContact: "krc@demo",
    status: "active",
    updatedLabel: "1 hr ago",
  },
  {
    id: "ag-enugu",
    logoInitials: "EN",
    code: "SEC",
    name: "South-East Corridor Office",
    jurisdiction: "Enugu · Anambra · Ebonyi",
    branches: 7,
    openTickets: 36,
    leadContact: "sec@demo",
    status: "active",
    updatedLabel: "45 min ago",
  },
  {
    id: "ag-ph",
    logoInitials: "PH",
    code: "PHC",
    name: "Port Harcourt Maritime Safety",
    jurisdiction: "Rivers ports",
    branches: 3,
    openTickets: 22,
    leadContact: "phc@demo",
    status: "active",
    updatedLabel: "3 hr ago",
  },
  {
    id: "ag-kd",
    logoInitials: "KD",
    code: "KDS",
    name: "Kaduna Stability Desk",
    jurisdiction: "Kaduna · Zaria ring",
    branches: 5,
    openTickets: 41,
    leadContact: "kds@demo",
    status: "active",
    updatedLabel: "30 min ago",
  },
  {
    id: "ag-ib",
    logoInitials: "IB",
    code: "IBO",
    name: "Ibadan Outer Ring Response",
    jurisdiction: "Oyo · Osun",
    branches: 4,
    openTickets: 15,
    leadContact: "ibo@demo",
    status: "pilot",
    updatedLabel: "5 days ago",
  },
  {
    id: "ag-cal",
    logoInitials: "CR",
    code: "CRS",
    name: "Cross River Support Unit",
    jurisdiction: "Cross River",
    branches: 2,
    openTickets: 9,
    leadContact: "crs@demo",
    status: "active",
    updatedLabel: "8 hr ago",
  },
  {
    id: "ag-bau",
    logoInitials: "BA",
    code: "BCH",
    name: "Bauchi Highlands Watch",
    jurisdiction: "Bauchi · Gombe",
    branches: 3,
    openTickets: 11,
    leadContact: "bch@demo",
    status: "active",
    updatedLabel: "Yesterday",
  },
  {
    id: "ag-ondo",
    logoInitials: "ON",
    code: "ODR",
    name: "Ondo Regional Response",
    jurisdiction: "Ondo · Ekiti",
    branches: 3,
    openTickets: 7,
    leadContact: "odr@demo",
    status: "active",
    updatedLabel: "4 hr ago",
  },
  {
    id: "ag-plateau",
    logoInitials: "PL",
    code: "PLJ",
    name: "Plateau Joint Operations",
    jurisdiction: "Plateau · Nasarawa",
    branches: 4,
    openTickets: 28,
    leadContact: "plj@demo",
    status: "active",
    updatedLabel: "20 min ago",
  },
  {
    id: "ag-rivers",
    logoInitials: "RV",
    code: "RIV",
    name: "Rivers Inland Dispatch",
    jurisdiction: "Rivers upland",
    branches: 3,
    openTickets: 19,
    leadContact: "riv@demo",
    status: "active",
    updatedLabel: "1 hr ago",
  },
  {
    id: "ag-akwa",
    logoInitials: "AK",
    code: "AKS",
    name: "Akwa Ibom Coastal Unit",
    jurisdiction: "Akwa Ibom",
    branches: 2,
    openTickets: 5,
    leadContact: "aks@demo",
    status: "pilot",
    updatedLabel: "1 week ago",
  },
  {
    id: "ag-benue",
    logoInitials: "BN",
    code: "BNC",
    name: "Benue Central Coordination",
    jurisdiction: "Benue",
    branches: 3,
    openTickets: 14,
    leadContact: "bnc@demo",
    status: "active",
    updatedLabel: "2 hr ago",
  },
];

export const INTERNAL_AGENCY_SUMMARY = {
  agencyCount: INTERNAL_AGENCIES.length,
  branchCount: INTERNAL_AGENCIES.reduce((a, r) => a + r.branches, 0),
  openTickets: INTERNAL_AGENCIES.reduce((a, r) => a + r.openTickets, 0),
  pilotsCount: INTERNAL_AGENCIES.filter((r) => r.status === "pilot").length,
} as const;

/** Main branch groups — map shows all satellites for the selected primary (or every group when cleared). */
export const INTERNAL_PRIMARY_BRANCHES: InternalPrimaryBranch[] = [
  {
    id: "pb-nsa-ikeja",
    label: "NSA — Ikeja HQ (main)",
    agencyName: "National Safety Agency",
    hotspots: [
      { id: "pb-nsa-ikeja-hub", primaryId: "pb-nsa-ikeja", label: "Ikeja HQ", xPct: 48, yPct: 26, tickets: 18, role: "hub" },
      { id: "pb-nsa-apapa", primaryId: "pb-nsa-ikeja", label: "Apapa jetty", xPct: 24, yPct: 56, tickets: 22, role: "satellite" },
      { id: "pb-nsa-lekki", primaryId: "pb-nsa-ikeja", label: "Lekki desk", xPct: 70, yPct: 44, tickets: 12, role: "satellite" },
      { id: "pb-nsa-abeokuta", primaryId: "pb-nsa-ikeja", label: "Abeokuta relay", xPct: 34, yPct: 74, tickets: 9, role: "satellite" },
      { id: "pb-nsa-ibadan", primaryId: "pb-nsa-ikeja", label: "Ibadan north", xPct: 26, yPct: 36, tickets: 11, role: "satellite" },
    ],
  },
  {
    id: "pb-lrc-vi",
    label: "LRC — Victoria Island (main)",
    agencyName: "Lagos Response Command",
    hotspots: [
      { id: "pb-lrc-vi-hub", primaryId: "pb-lrc-vi", label: "VI command", xPct: 62, yPct: 52, tickets: 26, role: "hub" },
      { id: "pb-lrc-maryland", primaryId: "pb-lrc-vi", label: "Maryland SOC", xPct: 52, yPct: 30, tickets: 14, role: "satellite" },
      { id: "pb-lrc-badagry", primaryId: "pb-lrc-vi", label: "Badagry post", xPct: 12, yPct: 48, tickets: 8, role: "satellite" },
      { id: "pb-lrc-epe", primaryId: "pb-lrc-vi", label: "Epe watch", xPct: 78, yPct: 28, tickets: 6, role: "satellite" },
    ],
  },
  {
    id: "pb-nerc-maid",
    label: "NERC — Maiduguri (main)",
    agencyName: "North-East Relief Coordination",
    hotspots: [
      { id: "pb-nerc-hub", primaryId: "pb-nerc-maid", label: "Maiduguri hub", xPct: 58, yPct: 18, tickets: 15, role: "hub" },
      { id: "pb-nerc-yola", primaryId: "pb-nerc-maid", label: "Yola field", xPct: 44, yPct: 24, tickets: 10, role: "satellite" },
      { id: "pb-nerc-damaturu", primaryId: "pb-nerc-maid", label: "Damaturu relay", xPct: 52, yPct: 12, tickets: 6, role: "satellite" },
    ],
  },
  {
    id: "pb-fct-abj",
    label: "FCT — Abuja core (main)",
    agencyName: "Federal Capital Territorial Watch",
    hotspots: [
      { id: "pb-fct-hub", primaryId: "pb-fct-abj", label: "Central district", xPct: 40, yPct: 42, tickets: 20, role: "hub" },
      { id: "pb-fct-kubwa", primaryId: "pb-fct-abj", label: "Kubwa station", xPct: 32, yPct: 48, tickets: 11, role: "satellite" },
      { id: "pb-fct-airport", primaryId: "pb-fct-abj", label: "Airport corridor", xPct: 46, yPct: 54, tickets: 9, role: "satellite" },
    ],
  },
  {
    id: "pb-phc-port",
    label: "PHC — Port zone (main)",
    agencyName: "Port Harcourt Maritime Safety",
    hotspots: [
      { id: "pb-phc-hub", primaryId: "pb-phc-port", label: "Harbour master", xPct: 20, yPct: 64, tickets: 17, role: "hub" },
      { id: "pb-phc-ogoni", primaryId: "pb-phc-port", label: "Ogoni liaison", xPct: 28, yPct: 58, tickets: 7, role: "satellite" },
      { id: "pb-phc-eleme", primaryId: "pb-phc-port", label: "Eleme industrial", xPct: 16, yPct: 70, tickets: 5, role: "satellite" },
    ],
  },
  {
    id: "pb-enugu-core",
    label: "SEC — Enugu core (main)",
    agencyName: "South-East Corridor Office",
    hotspots: [
      { id: "pb-enu-hub", primaryId: "pb-enugu-core", label: "Enugu HQ", xPct: 54, yPct: 62, tickets: 13, role: "hub" },
      { id: "pb-enu-onitsha", primaryId: "pb-enugu-core", label: "Onitsha bridge", xPct: 48, yPct: 56, tickets: 11, role: "satellite" },
      { id: "pb-enu-abakaliki", primaryId: "pb-enugu-core", label: "Abakaliki desk", xPct: 60, yPct: 58, tickets: 8, role: "satellite" },
      { id: "pb-enu-awka", primaryId: "pb-enugu-core", label: "Awka relay", xPct: 50, yPct: 66, tickets: 4, role: "satellite" },
    ],
  },
];

export function getAllBranchHotspots(): InternalAgencyBranchHotspot[] {
  return INTERNAL_PRIMARY_BRANCHES.flatMap((p) => p.hotspots);
}

export const INTERNAL_STATUS_FILTER_OPTIONS: { value: InternalAgencyStatus; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "pilot", label: "Pilot" },
  { value: "suspended", label: "Suspended" },
];

/** First segment of jurisdiction (before ·) used as a coarse “region” bucket. */
export type InternalAgencyRegionTicketRow = {
  label: string;
  agencyCount: number;
  openTickets: number;
};

export function getInternalAgencyRegionTickets(
  rows: readonly InternalAgencyRow[]
): InternalAgencyRegionTicketRow[] {
  const m = new Map<string, { agencyCount: number; openTickets: number }>();
  for (const r of rows) {
    const label = (r.jurisdiction.split("·")[0] ?? r.jurisdiction).trim() || r.jurisdiction;
    const cur = m.get(label) ?? { agencyCount: 0, openTickets: 0 };
    cur.agencyCount += 1;
    cur.openTickets += r.openTickets;
    m.set(label, cur);
  }
  return [...m.entries()]
    .map(([label, v]) => ({ label, ...v }))
    .sort((a, b) => b.openTickets - a.openTickets)
    .slice(0, 8);
}

export type InternalAgencyStatusCount = {
  status: InternalAgencyStatus;
  count: number;
};

export function getInternalAgencyStatusCounts(
  rows: readonly InternalAgencyRow[]
): InternalAgencyStatusCount[] {
  const order: InternalAgencyStatus[] = ["active", "pilot", "suspended"];
  const map = new Map<InternalAgencyStatus, number>();
  for (const s of order) map.set(s, 0);
  for (const r of rows) map.set(r.status, (map.get(r.status) ?? 0) + 1);
  return order.map((status) => ({ status, count: map.get(status) ?? 0 }));
}

export function getInternalAgenciesTopByOpenTickets(
  rows: readonly InternalAgencyRow[],
  n = 6
): InternalAgencyRow[] {
  return [...rows].sort((a, b) => b.openTickets - a.openTickets).slice(0, n);
}
