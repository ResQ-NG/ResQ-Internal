import { DashboardSidebar } from "./_components/DashboardSidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/authourize");

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
