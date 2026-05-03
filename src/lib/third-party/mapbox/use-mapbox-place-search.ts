"use client";

import { useCallback, useState, type FormEvent } from "react";
import { getMapboxAccessToken } from "@/lib/third-party/mapbox/mapbox-env";

export type UseMapboxPlaceSearchOptions = {
  /** Current search text (controlled by the caller). */
  query: string;
  /** Called with the first geocode result center. */
  flyTo: (lng: number, lat: number, zoom?: number) => void;
  /** Mapbox Geocoding `country` filter (ISO 3166-1 alpha-2). */
  country?: string;
  /** Zoom level after a successful match. */
  resultZoom?: number;
};

export type UseMapboxPlaceSearchResult = {
  /** Pass to `<form onSubmit={onSubmit}>`. */
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  searching: boolean;
  error: string;
  clearError: () => void;
};

/**
 * Geocode a free-text query via Mapbox Places and fly the map to the first hit.
 */
export function useMapboxPlaceSearch({
  query,
  flyTo,
  country = "ng",
  resultZoom = 11,
}: UseMapboxPlaceSearchOptions): UseMapboxPlaceSearchResult {
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  const clearError = useCallback(() => setError(""), []);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!query.trim()) return;
      const token = getMapboxAccessToken();
      if (!token) return;
      setSearching(true);
      setError("");
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${token}&limit=1&country=${encodeURIComponent(country)}`
        );
        const data = await res.json();
        const feature = data?.features?.[0];
        if (feature) {
          const [lng, lat] = feature.center as [number, number];
          flyTo(lng, lat, resultZoom);
        } else {
          setError("Location not found — try a more specific name.");
        }
      } catch {
        setError("Search failed. Check your connection.");
      } finally {
        setSearching(false);
      }
    },
    [query, flyTo, country, resultZoom]
  );

  return { onSubmit, searching, error, clearError };
}
