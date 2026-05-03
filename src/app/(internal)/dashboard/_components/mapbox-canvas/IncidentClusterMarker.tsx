"use client";

export function IncidentClusterMarker({ count }: { count: number }) {
  const size = Math.round(36 + Math.min(Math.log2(count) * 5, 24));
  return (
    <button
      type="button"
      className="group relative flex items-center justify-center focus:outline-none"
      style={{ width: size, height: size }}
      aria-label={`${count} incidents clustered — click to zoom in`}
    >
      <span className="absolute inset-0 rounded-full bg-primary-blue/20 transition-transform duration-150 group-hover:scale-110 dark:bg-primary-blue-dark/25" />
      <span className="relative flex h-[72%] w-[72%] items-center justify-center rounded-full bg-primary-blue text-white shadow-lg dark:bg-primary-blue-dark">
        <span
          className="font-metropolis-semibold leading-none"
          style={{ fontSize: size < 48 ? 11 : 13 }}
        >
          {count >= 1000 ? `${Math.floor(count / 1000)}k` : count}
        </span>
      </span>
    </button>
  );
}
