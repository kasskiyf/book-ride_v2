"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

const profileCompletionSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 digits"),
  emergencyContact: z.object({
    name: z.string().min(1, "Emergency contact name is required"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    relationship: z.string().min(1, "Relationship is required"),
  }),
  preferredLanguage: z.string(),
  communicationPreference: z.string(),
});

type ProfileCompletionValues = z.infer<typeof profileCompletionSchema>;

export function ProfileCompletion() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { completeProfile } = useAuth();

  const form = useForm<ProfileCompletionValues>({
    resolver: zodResolver(profileCompletionSchema),
    defaultValues: {
      preferredLanguage: "en",
      communicationPreference: "email",
    },
  });

  async function onSubmit(data: ProfileCompletionValues) {
    try {
      setIsLoading(true);
      await completeProfile(data);
      toast.success("Profile completed successfully");
      router.push("/profile");
    } catch (error) {
      toast.error("Failed to complete profile");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Contact Information</h2>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                {...form.register("phone")}
                disabled={isLoading}
              />
              {form.formState.errors.phone && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                {...form.register("address")}
                disabled={isLoading}
              />
              {form.formState.errors.address && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.address.message}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  {...form.register("city")}
                  disabled={isLoading}
                />
                {form.formState.errors.city && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.city.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  {...form.register("state")}
                  disabled={isLoading}
                />
                {form.formState.errors.state && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.state.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  {...form.register("zipCode")}
                  disabled={isLoading}
                />
                {form.formState.errors.zipCode && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.zipCode.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Emergency Contact</h2>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emergencyContactName">Name</Label>
              <Input
                id="emergencyContactName"
                {...form.register("emergencyContact.name")}
                disabled={isLoading}
              />
              {form.formState.errors.emergencyContact?.name && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.emergencyContact.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContactPhone">Phone number</Label>
              <Input
                id="emergencyContactPhone"
                {...form.register("emergencyContact.phone")}
                disabled={isLoading}
              />
              {form.formState.errors.emergencyContact?.phone && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.emergencyContact.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContactRelationship">Relationship</Label>
              <Input
                id="emergencyContactRelationship"
                {...form.register("emergencyContact.relationship")}
                disabled={isLoading}
              />
              {form.formState.errors.emergencyContact?.relationship && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.emergencyContact.relationship.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Preferences</h2>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="preferredLanguage">Preferred Language</Label>
              <Select
                defaultValue="en"
                onValueChange={(value) =>
                  form.setValue("preferredLanguage", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="communicationPreference">
                Communication Preference
              </Label>
              <Select
                defaultValue="email"
                onValueChange={(value) =>
                  form.setValue("communicationPreference", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Completing profile..." : "Complete profile"}
      </Button>
    </form>
  );
}