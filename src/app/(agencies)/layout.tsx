import { ReactNode } from "react";
import { AgenciesSidebar } from "./_components/AgenciesSidebar";

export default function AgenciesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-light dark:bg-surface-dark">
      <AgenciesSidebar />
      <div className="flex-1 overflow-auto">
        <div className="mx-auto min-h-full w-full max-w-6xl bg-surface-light px-4 py-5 text-primaryDark sm:px-6 sm:py-6 md:px-8 md:py-8 dark:bg-surface-dark dark:text-primaryDark-dark">
          {children}
        </div>
      </div>
    </div>
  );
}

