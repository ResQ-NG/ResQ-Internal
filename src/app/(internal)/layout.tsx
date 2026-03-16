import { DashboardSidebar } from "./_components/DashboardSidebar";

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-light dark:bg-surface-dark">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <div className="min-h-full bg-surface-light dark:bg-surface-dark text-primaryDark dark:text-primaryDark-dark">
          {children}
        </div>
      </div>
    </div>
  );
}
