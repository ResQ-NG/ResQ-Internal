import { ReactNode } from "react";
import { AgenciesSidebar } from "./_components/AgenciesSidebar";

export default function AgenciesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-light dark:bg-surface-dark">
      <AgenciesSidebar />
      <div className="flex-1 overflow-auto">
        <div className="min-h-full bg-surface-light dark:bg-surface-dark text-primaryDark dark:text-primaryDark-dark">
          {children}
        </div>
      </div>
    </div>
  );
}

