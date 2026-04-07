import type { Metadata } from "next";
import { AuthCard } from "../_components/AuthCard";
import { VerifyPanel } from "../_components/VerifyPanel";

export const metadata: Metadata = {
  title: "Verify email · ResQ Internal",
  description: "Verify your email for ResQ Internal",
};

type SearchParams = { token?: string | string[] };

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams> | SearchParams;
}) {
  const resolved = await Promise.resolve(searchParams);
  const raw = resolved.token;
  const token = Array.isArray(raw) ? raw[0] : raw;

  return (
    <AuthCard>
      <VerifyPanel token={token} />
    </AuthCard>
  );
}
