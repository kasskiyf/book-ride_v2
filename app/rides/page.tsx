"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Calendar, Clock, Car, Star } from "lucide-react";
import { rideService } from "@/lib/rides";
import { useAuth } from "@/contexts/auth-context";
import type { RideRequest } from "@/lib/types/ride";
import { format, formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default function RidesPage() {
  const { user } = useAuth();
  const [rides, setRides] = useState<RideRequest[]>([]);

  useEffect(() => {
    if (!user) return;

    // Initial load
    loadRides();

    // Set up polling every 30 seconds to check for updates
    const interval = setInterval(loadRides, 30000);

    return () => clearInterval(interval);
  }, [user]);

  const loadRides = () => {
    if (!user) return;
    const userRides = rideService.getRideRequestsByUser(user.id);
    setRides(userRides);
  };

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
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Your Rides</h1>
          <p className="mt-2 text-muted-foreground">
            View and manage your ride requests
          </p>
        </div>

        <div className="grid gap-6">
          {rides.map((ride) => (
            <Card key={ride.id} className="p-6">
              <div className="flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className={getStatusColor(ride.status)}
                >
                  {ride.status === "pending" && "Waiting for Driver"}
                  {ride.status === "accepted" && "Driver Assigned"}
                  {ride.status === "confirmed" && "On the Way"}
                  {ride.status === "completed" && "Completed"}
                  {ride.status === "cancelled" && "Cancelled"}
                </Badge>
                <Button variant="outline" asChild>
                  <Link href={`/rides/${ride.id}`}>View Details</Link>
                </Button>
              </div>

              {ride.driver && (
                <div className="mt-6 rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold">Driver Information</h3>
                    {ride.estimatedArrival && (
                      <p className="text-sm text-muted-foreground">
                        Arriving in{" "}
                        {formatDistanceToNow(new Date(ride.estimatedArrival))}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {ride.driver.firstName[0]}
                        {ride.driver.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">
                          {ride.driver.firstName} {ride.driver.lastName}
                        </p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="text-sm">
                            {ride.driver.rating} ({ride.driver.totalRides} rides)
                          </span>
                        </div>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {ride.driver.vehicle.model} • {ride.driver.vehicle.color}{" "}
                          • {ride.driver.vehicle.plate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
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

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <Calendar className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">
                      {format(ride.date, "PPP")}
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

              {ride.specialRequests && (
                <div className="mt-4 rounded-lg bg-muted p-4">
                  <p className="font-medium">Special Requests:</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {ride.specialRequests}
                  </p>
                </div>
              )}
            </Card>
          ))}

          {rides.length === 0 && (
            <Card className="p-8 text-center">
              <h2 className="text-lg font-semibold">No rides yet</h2>
              <p className="mt-2 text-muted-foreground">
                Book your first ride to get started
              </p>
              <Button className="mt-4" asChild>
                <Link href="/">Book a Ride</Link>
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}