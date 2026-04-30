import { redirect } from "next/navigation";
import { INTERNAL_DASHBOARD_ROUTES } from "@/lib/routes/internal-dashboard-routes";

export default function DashboardRootPage() {
  redirect(INTERNAL_DASHBOARD_ROUTES.overview);
}
