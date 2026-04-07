import type { Metadata } from "next";
import { AuthCard } from "../_components/AuthCard";
import { ResetPasswordForm } from "../_components/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset password · ResQ Internal",
  description: "Reset your ResQ Internal password",
};

export default function ResetPasswordPage() {
  return (
    <AuthCard>
      <ResetPasswordForm />
    </AuthCard>
  );
}
