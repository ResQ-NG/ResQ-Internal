import { AgencyIdentityBar } from "@/app/(agencies)/_components/AgencyIdentityBar";
import { AgencySettingsView } from "@/app/(agencies)/_components/agency/AgencySettingsView";

export default function AgenciesSettingsPage() {
  return (
    <div className="space-y-8">
      <AgencyIdentityBar />
      <AgencySettingsView />
    </div>
  );
}
