import { AgencyIdentityBar } from "@/app/(agencies)/_components/AgencyIdentityBar";
import { AgencyBroadcastsView } from "@/app/(agencies)/_components/agency/AgencyBroadcastsView";
import {
  AGENCY_BROADCASTS_ACTIVE,
  AGENCY_BROADCASTS_HISTORY,
} from "@/app/(agencies)/_data/agency-dummy-data";

export default function AgenciesBroadcastsPage() {
  return (
    <div className="space-y-8">
      <AgencyIdentityBar />
      <AgencyBroadcastsView active={AGENCY_BROADCASTS_ACTIVE} history={AGENCY_BROADCASTS_HISTORY} />
    </div>
  );
}
