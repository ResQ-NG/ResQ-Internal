/**
 * Internal ResQ dashboard paths (App Router).
 * Use these (and helpers below) instead of hard-coded hrefs so nav, redirects, and links stay aligned.
 */
export const INTERNAL_DASHBOARD_ROUTES = {
  root: "/dashboard",
  overview: "/dashboard/overview",
  workspace: "/dashboard/overview/workspace",
  profile: "/dashboard/profile",
  agencies: {
    root: "/dashboard/agencies",
    routingRules: "/dashboard/agencies/routing-rules",
    staff: "/dashboard/agencies/staff",
    new: "/dashboard/agencies/new",
  },
  incidents: {
    root: "/dashboard/incidents",
    reports: "/dashboard/incidents/reports",
    watchMeSos: "/dashboard/incidents/watch-me-sos",
  },
  users: {
    root: "/dashboard/users",
    segments: "/dashboard/users/segments",
  },
  platform: {
    root: "/dashboard/platform",
    logs: "/dashboard/platform/logs",
  },
  settings: "/dashboard/settings",
} as const;

/** Former URLs — redirects and breadcrumb matching only. */
export const INTERNAL_DASHBOARD_ROUTE_LEGACY = {
  overviewRoot: "/overview",
  overviewMapWorkspace: "/overview/map-workspace",
  overviewLiveIncidents: "/overview/live-incidents",
  dashboardMapWorkspace: "/dashboard/overview/map-workspace",
  dashboardLiveIncidents: "/dashboard/live-incidents",
  dashboardOverviewLiveIncidents: "/dashboard/overview/live-incidents",
} as const;

/** `pathname === base` or `pathname` is under `base/` */
export function isDashboardPathUnder(pathname: string, base: string): boolean {
  return pathname === base || pathname.startsWith(`${base}/`);
}

/** Command Center sidebar: home + `/dashboard/overview` subtree */
export function isCommandCenterSectionActive(pathname: string): boolean {
  const { root, overview } = INTERNAL_DASHBOARD_ROUTES;
  return pathname === root || pathname === overview || pathname.startsWith(`${overview}/`);
}

/**
 * Sidebar child highlight. `/dashboard` (overview home) must not match deeper routes
 * like `/dashboard/overview/workspace`.
 */
export function isDashboardNavChildActive(pathname: string, childHref: string): boolean {
  const { root, overview } = INTERNAL_DASHBOARD_ROUTES;
  if (childHref === root) {
    return pathname === root || pathname === overview;
  }
  return pathname === childHref || pathname.startsWith(`${childHref}/`);
}

export function isWorkspaceBreadcrumbPath(pathname: string): boolean {
  const { workspace } = INTERNAL_DASHBOARD_ROUTES;
  const L = INTERNAL_DASHBOARD_ROUTE_LEGACY;
  return (
    isDashboardPathUnder(pathname, workspace) ||
    isDashboardPathUnder(pathname, L.dashboardMapWorkspace) ||
    isDashboardPathUnder(pathname, L.overviewMapWorkspace)
  );
}

export function isDashboardOverviewBreadcrumbPath(pathname: string): boolean {
  const { root, overview } = INTERNAL_DASHBOARD_ROUTES;
  return (
    pathname === root ||
    pathname === overview ||
    pathname === INTERNAL_DASHBOARD_ROUTE_LEGACY.overviewRoot
  );
}
