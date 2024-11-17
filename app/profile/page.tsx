"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "@/components/profile/profile-form";
import { RideHistory } from "@/components/profile/ride-history";
import { PaymentMethods } from "@/components/profile/payment-methods";
import { Preferences } from "@/components/profile/preferences";
import { Documents } from "@/components/profile/documents";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container py-24">
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your account preferences and settings
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="rides">Ride History</TabsTrigger>
            <TabsTrigger value="payments">Payment Methods</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="p-6">
              <ProfileForm user={user} />
            </Card>
          </TabsContent>

          <TabsContent value="rides">
            <Card className="p-6">
              <RideHistory />
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card className="p-6">
              <PaymentMethods />
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card className="p-6">
              <Documents />
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card className="p-6">
              <Preferences />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}