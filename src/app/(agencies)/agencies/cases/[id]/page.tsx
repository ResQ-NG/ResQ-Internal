import { AgencyIdentityBar } from "@/app/(agencies)/_components/AgencyIdentityBar";
import { AgencyCaseDetailView } from "@/app/(agencies)/_components/agency/AgencyCaseDetailView";
import { getAgencyCaseDetailOrFallback } from "@/app/(agencies)/_data/agency-dummy-data";
import { notFound } from "next/navigation";

interface CaseDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CaseDetailPage({ params }: CaseDetailPageProps) {
  const { id } = await params;
  const detail = getAgencyCaseDetailOrFallback(id);
  if (!detail) notFound();

  return (
    <div className="space-y-8">
      <AgencyIdentityBar />
      <AgencyCaseDetailView detail={detail} />
    </div>
  );
}
