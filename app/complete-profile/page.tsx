"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Card } from "@/components/ui/card";
import { ProfileCompletion } from "@/components/profile/profile-completion";
import { redirect } from "next/navigation";

export default function CompleteProfilePage() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/auth");
    }
    if (!isLoading && user?.isProfileComplete) {
      redirect("/profile");
    }
  }, [user, isLoading]);

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center py-24">
      <Card className="mx-auto w-full max-w-[600px] p-8">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Complete Your Profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Please provide the following information to complete your account setup
          </p>
        </div>
        <ProfileCompletion />
      </Card>
    </div>
  );
}