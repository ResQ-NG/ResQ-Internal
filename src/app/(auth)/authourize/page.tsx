import type { Metadata } from "next";
import { AuthCard } from "../_components/AuthCard";
import { SignInForm } from "../_components/SignInForm";

export const metadata: Metadata = {
  title: "Sign in · ResQ Internal",
  description: "Sign in to ResQ Internal",
};

export default function AuthorizePage() {
  return (
    <AuthCard>
      <SignInForm />
    </AuthCard>
  );
}
