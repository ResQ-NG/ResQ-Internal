import { ReactNode } from "react";
import { MediaSidebar } from "./_components/MediaSidebar";

export default function MediaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-light dark:bg-surface-dark">
      <MediaSidebar />
      <div className="flex-1 overflow-auto">
        <div className="min-h-full bg-surface-light dark:bg-surface-dark text-primaryDark dark:text-primaryDark-dark">
          {children}
        </div>
      </div>
    </div>
  );
}

