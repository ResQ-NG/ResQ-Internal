"use client";

import { useState } from "react";
import { Tag, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils/generics";
import type { SampleInboxRow } from "../sampleCommandData";

export function IncidentDetailActions({
  row,
  showCategorize,
}: {
  row: SampleInboxRow;
  showCategorize?: boolean;
}) {
  const [categorizing, setCategorizing] = useState(false);
  const [assigning, setAssigning] = useState(false);

  const allowCategorize = showCategorize ?? row.category === null;

  const handleCategorize = () => {
    setCategorizing(true);
    setTimeout(() => setCategorizing(false), 1800);
  };

  const handleAssign = () => {
    setAssigning(true);
    setTimeout(() => setAssigning(false), 1800);
  };

  return (
    <div className="flex flex-col gap-2 pt-1">
      {allowCategorize ? (
        <button
          type="button"
          onClick={handleCategorize}
          disabled={categorizing}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-blue to-primary-blue-dark px-4 py-2.5 text-sm font-metropolis-semibold text-white shadow-md transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          )}
        >
          <Tag className="h-4 w-4" />
          {categorizing
            ? "Opening categorization…"
            : "Categorize this report →"}
        </button>
      ) : null}
      <button
        type="button"
        onClick={handleAssign}
        disabled={assigning}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-captionDark/25 px-4 py-2.5 text-sm font-metropolis-semibold text-primaryDark transition-all duration-200 hover:border-primary-blue/40 hover:bg-primary-blue/[0.06] hover:text-primary-blue active:scale-[0.98] disabled:opacity-60 dark:border-captionDark-dark/30 dark:text-primaryDark-dark dark:hover:border-primary-blue-dark/45 dark:hover:bg-primary-blue-dark/10 dark:hover:text-primary-blue-dark"
      >
        <UserCheck className="h-4 w-4" />
        {assigning ? "Opening assignment…" : "Assign to agent"}
      </button>
    </div>
  );
}
