"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Configure system-wide settings and preferences
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold">General Settings</h2>
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input defaultValue="Jack's Ride" />
            </div>

            <div className="space-y-2">
              <Label>Support Email</Label>
              <Input type="email" defaultValue="support@jacksride.com" />
            </div>

            <div className="space-y-2">
              <Label>Time Zone</Label>
              <Select defaultValue="UTC">
                <SelectTrigger>
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">Eastern Time</SelectItem>
                  <SelectItem value="PST">Pacific Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Currency</Label>
              <Select defaultValue="USD">
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send system notifications via email
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send alerts via SMS
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label>Email Footer Text</Label>
              <Textarea
                defaultValue="This email was sent by Jack's Ride. Please do not reply to this email."
                rows={3}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold">Pricing & Fees</h2>
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label>Base Fare</Label>
              <Input type="number" defaultValue="5.00" />
            </div>

            <div className="space-y-2">
              <Label>Price per Mile</Label>
              <Input type="number" defaultValue="2.50" />
            </div>

            <div className="space-y-2">
              <Label>Minimum Fare</Label>
              <Input type="number" defaultValue="10.00" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dynamic Pricing</Label>
                <p className="text-sm text-muted-foreground">
                  Enable surge pricing during peak hours
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}