import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  /** Lets you use `PUBLIC_MAPBOX_STYLE_URL*` in `.env.local`; client code still reads `NEXT_PUBLIC_*`. */
  env: {
    NEXT_PUBLIC_MAPBOX_STYLE_URL:
      process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL || process.env.PUBLIC_MAPBOX_STYLE_URL || "",
    NEXT_PUBLIC_MAPBOX_STYLE_URL_DARK:
      process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL_DARK || process.env.PUBLIC_MAPBOX_STYLE_URL_DARK || "",
  },
};

export default nextConfig;
