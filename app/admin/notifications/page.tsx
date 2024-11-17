"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  MessageSquare,
} from "lucide-react";

const notifications = [
  {
    id: "1",
    type: "alert",
    title: "System Maintenance",
    message: "Scheduled maintenance in 2 hours. Service might be interrupted.",
    time: "10 minutes ago",
    status: "unread",
  },
  {
    id: "2",
    type: "success",
    title: "New Driver Approved",
    message: "Driver application #1234 has been approved and onboarded.",
    time: "1 hour ago",
    status: "read",
  },
  {
    id: "3",
    type: "info",
    title: "Peak Hours Alert",
    message: "Entering peak hours. Surge pricing is now active.",
    time: "2 hours ago",
    status: "read",
  },
  {
    id: "4",
    type: "message",
    title: "Customer Support Queue",
    message: "5 support tickets awaiting response.",
    time: "3 hours ago",
    status: "unread",
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "alert":
      return AlertTriangle;
    case "success":
      return CheckCircle;
    case "info":
      return Info;
    case "message":
      return MessageSquare;
    default:
      return Bell;
  }
};

const getIconColor = (type: string) => {
  switch (type) {
    case "alert":
      return "text-yellow-500";
    case "success":
      return "text-green-500";
    case "info":
      return "text-blue-500";
    case "message":
      return "text-purple-500";
    default:
      return "text-gray-500";
  }
};

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            System alerts and important updates
          </p>
        </div>
        <Button variant="outline">
          Mark All as Read
        </Button>
      </div>

      <div className="grid gap-4">
        {notifications.map((notification) => {
          const Icon = getIcon(notification.type);
          const iconColor = getIconColor(notification.type);

          return (
            <Card
              key={notification.id}
              className={`p-6 ${
                notification.status === "unread" ? "bg-muted/40" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`rounded-full bg-${iconColor}/10 p-2`}>
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{notification.title}</h3>
                    {notification.status === "unread" && (
                      <Badge variant="secondary" className="bg-primary/10">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-muted-foreground">
                    {notification.message}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}