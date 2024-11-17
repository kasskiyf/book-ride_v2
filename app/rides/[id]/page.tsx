"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Calendar, Clock, Car } from "lucide-react";
import { rideService } from "@/lib/rides";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import type { RideRequest } from "@/lib/types/ride";
import { format, formatDistanceToNow } from "date-fns";

// This function is required for static site generation with dynamic routes
export async function generateStaticParams() {
  // Since our rides are managed client-side in localStorage,
  // we'll return an empty array for the initial build
  return [];
}

export default function RidePage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [ride, setRide] = useState<RideRequest | null>(null);

  useEffect(() => {
    const requests = rideService.getRideRequests();
    const request = requests.find((r) => r.id === id);
    if (request) {
      setRide(request);
    }
  }, [id]);

  const handleConfirmRide = () => {
    if (!ride) return;

    try {
      const updatedRide = rideService.confirmRideRequest(ride.id);
      setRide(updatedRide);
      toast.success("Ride confirmed successfully");
    } catch (error) {
      toast.error("Failed to confirm ride");
    }
  };

  if (!ride) {
    return <div>Ride not found</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case "accepted":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      case "confirmed":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "completed":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
      default:
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
    }
  };

  return (
    <div className="container py-24">
      <div className="mx-auto max-w-2xl">
        <Card className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Ride Details</h1>
            <Badge className={getStatusColor(ride.status)} variant="secondary">
              {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
            </Badge>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-2">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Pickup Location</p>
                  <p className="text-sm text-muted-foreground">
                    {ride.pickupLocation}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Drop-off Location</p>
                  <p className="text-sm text-muted-foreground">
                    {ride.dropoffLocation}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-2">
                <Calendar className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(ride.date), "PPP")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-sm text-muted-foreground">{ride.time}</p>
                </div>
              </div>
            </div>

            {ride.driverId && (
              <div className="rounded-lg border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold">Driver Information</h2>
                  {ride.estimatedArrival && (
                    <p className="text-sm text-muted-foreground">
                      Arriving in{" "}
                      {formatDistanceToNow(new Date(ride.estimatedArrival))}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">
                      ⭐ 4.9 (120 rides)
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Tesla Model S • ABC 123
                  </p>
                </div>
              </div>
            )}

            {ride.status === "accepted" && user?.id === ride.userId && (
              <Button onClick={handleConfirmRide} className="w-full">
                Confirm Ride
              </Button>
            )}

            {ride.status === "pending" && (
              <p className="text-center text-sm text-muted-foreground">
                Waiting for a driver to accept your ride request...
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}