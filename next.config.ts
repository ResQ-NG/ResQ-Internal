import type { NextConfig } from "next";
import {
  INTERNAL_DASHBOARD_ROUTES,
  INTERNAL_DASHBOARD_ROUTE_LEGACY,
} from "./src/lib/routes/internal-dashboard-routes";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    const r = INTERNAL_DASHBOARD_ROUTES;
    const L = INTERNAL_DASHBOARD_ROUTE_LEGACY;
    return [
      { source: L.overviewRoot, destination: r.root, permanent: false },
      { source: L.overviewMapWorkspace, destination: r.workspace, permanent: false },
      { source: L.dashboardMapWorkspace, destination: r.workspace, permanent: false },
      { source: L.overviewLiveIncidents, destination: r.root, permanent: false },
      { source: L.dashboardLiveIncidents, destination: r.root, permanent: false },
      { source: L.dashboardOverviewLiveIncidents, destination: r.root, permanent: false },
    ];
  },
  /** Lets you use `PUBLIC_MAPBOX_STYLE_URL*` in `.env.local`; client code still reads `NEXT_PUBLIC_*`. */
  env: {
    NEXT_PUBLIC_MAPBOX_STYLE_URL:
      process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL || process.env.PUBLIC_MAPBOX_STYLE_URL || "",
    NEXT_PUBLIC_MAPBOX_STYLE_URL_DARK:
      process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL_DARK || process.env.PUBLIC_MAPBOX_STYLE_URL_DARK || "",
  },
};

export default nextConfig;
