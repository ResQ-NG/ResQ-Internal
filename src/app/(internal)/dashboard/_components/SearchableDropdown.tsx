"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type SearchableDropdownOption = { value: string; label: string };

export function SearchableDropdown({
  value,
  onValueChange,
  options,
  placeholder,
  ariaLabel,
  emptyLabel = "All",
  disabled = false,
  className,
  inputClassName,
}: {
  value: string;
  onValueChange: (next: string) => void;
  options: SearchableDropdownOption[];
  placeholder?: string;
  ariaLabel: string;
  /** Label shown for the empty (cleared) selection */
  emptyLabel?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selectedLabel =
    value === "" ? emptyLabel : options.find((o) => o.value === value)?.label ?? value;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          if (disabled) return;
          setOpen((o) => !o);
          // focus the input after opening
          requestAnimationFrame(() => inputRef.current?.focus());
        }}
        className={cn(
          "flex h-8 min-w-[10rem] items-center justify-between gap-2 rounded-lg border border-captionDark/20 bg-surface-light px-2.5 text-[11px] font-metropolis-semibold text-primaryDark shadow-sm outline-none transition-colors",
          "focus-visible:border-primary-blue/40 focus-visible:ring-2 focus-visible:ring-primary-blue/20",
          "disabled:opacity-50",
          "dark:border-captionDark-dark/25 dark:bg-surface-dark dark:text-primaryDark-dark dark:focus-visible:border-primary-blue-dark/45 dark:focus-visible:ring-primary-blue-dark/20",
          inputClassName
        )}
      >
        <span className="min-w-0 truncate">{selectedLabel || placeholder || emptyLabel}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 shrink-0 opacity-70 transition-transform", open && "rotate-180")} />
      </button>

      {open ? (
        <div
          className="absolute right-0 top-[calc(100%+0.5rem)] z-[520] w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-captionDark/15 bg-surface-light shadow-xl dark:border-captionDark-dark/20 dark:bg-surface-dark"
          role="listbox"
          aria-label={ariaLabel}
        >
          <div className="flex items-center gap-2 border-b border-captionDark/10 px-3 py-2 dark:border-captionDark-dark/15">
            <Search className="h-3.5 w-3.5 text-captionDark dark:text-captionDark-dark" aria-hidden />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.preventDefault();
                  setOpen(false);
                }
                if (e.key === "Enter") {
                  e.preventDefault();
                  const first = filtered[0];
                  if (first) {
                    onValueChange(first.value);
                    setOpen(false);
                  }
                }
              }}
              className="w-full bg-transparent py-1 text-xs text-primaryDark outline-none placeholder:text-captionDark/60 dark:text-primaryDark-dark dark:placeholder:text-captionDark-dark/50"
              placeholder={placeholder ?? "Search…"}
            />
          </div>

          <div className="max-h-[260px] overflow-y-auto p-1 [scrollbar-width:thin]">
            <OptionRow
              label={emptyLabel}
              selected={value === ""}
              onPick={() => {
                onValueChange("");
                setOpen(false);
              }}
            />

            {filtered.length === 0 ? (
              <div className="px-3 py-2 text-xs text-captionDark dark:text-captionDark-dark">
                No matches.
              </div>
            ) : (
              filtered.map((o) => (
                <OptionRow
                  key={o.value}
                  label={o.label}
                  selected={o.value === value}
                  onPick={() => {
                    onValueChange(o.value);
                    setOpen(false);
                  }}
                />
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function OptionRow({
  label,
  selected,
  onPick,
}: {
  label: string;
  selected: boolean;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      onClick={onPick}
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-xs transition-colors",
        selected
          ? "bg-primary-blue/12 text-primary-blue dark:bg-primary-blue-dark/20 dark:text-primary-blue-dark"
          : "text-primaryDark hover:bg-captionDark/[0.06] dark:text-primaryDark-dark dark:hover:bg-captionDark-dark/[0.08]"
      )}
    >
      <span className="min-w-0 truncate">{label}</span>
      {selected ? (
        <span className="text-[10px] font-metropolis-semibold">Selected</span>
      ) : null}
    </button>
  );
}

