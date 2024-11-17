"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Calendar, Clock, Star, Phone, Mail } from "lucide-react";
import { rideService } from "@/lib/rides";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import type { RideRequest } from "@/lib/types/ride";
import { format } from "date-fns";
import Link from "next/link";

export default function DriverRidesPage() {
  const { user } = useAuth();
  const [availableRides, setAvailableRides] = useState<RideRequest[]>([]);
  const [acceptedRides, setAcceptedRides] = useState<RideRequest[]>([]);

  useEffect(() => {
    if (!user) return;

    const available = rideService.getAvailableRideRequests();
    const accepted = rideService.getRideRequestsByDriver(user.id);
    setAvailableRides(available);
    setAcceptedRides(accepted);
  }, [user]);

  const handleAcceptRide = (rideId: string) => {
    if (!user) return;

    try {
      const updatedRide = rideService.acceptRideRequest(rideId, user);
      setAvailableRides((prev) => prev.filter((r) => r.id !== rideId));
      setAcceptedRides((prev) => [...prev, updatedRide]);
      toast.success("Ride accepted successfully");
    } catch (error) {
      toast.error("Failed to accept ride");
    }
  };

  return (
    <div className="container py-24">
      <div className="mx-auto max-w-4xl space-y-12">
        <div>
          <h1 className="text-3xl font-bold">Available Rides</h1>
          <div className="mt-8 grid gap-6">
            {availableRides.map((ride) => (
              <Card key={ride.id} className="p-6">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">
                    New Request
                  </Badge>
                  <Button onClick={() => handleAcceptRide(ride.id)}>
                    Accept Ride
                  </Button>
                </div>

                <div className="mt-6 flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {ride.passenger.firstName[0]}
                      {ride.passenger.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">
                        {ride.passenger.firstName} {ride.passenger.lastName}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">
                          {ride.passenger.rating} ({ride.passenger.totalRides} rides)
                        </span>
                      </div>
                    </div>
                    <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {ride.passenger.email}
                      </div>
                      {ride.passenger.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {ride.passenger.phone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

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

            {availableRides.length === 0 && (
              <p className="text-center text-muted-foreground">
                No available rides at the moment
              </p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Your Accepted Rides</h2>
          <div className="mt-8 grid gap-6">
            {acceptedRides.map((ride) => (
              <Card key={ride.id} className="p-6">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className={
                      ride.status === "accepted"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-green-500/10 text-green-500"
                    }
                  >
                    {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                  </Badge>
                  <Button variant="outline" asChild>
                    <Link href={`/rides/${ride.id}`}>View Details</Link>
                  </Button>
                </div>

                <div className="mt-6 flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {ride.passenger.firstName[0]}
                      {ride.passenger.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">
                        {ride.passenger.firstName} {ride.passenger.lastName}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">
                          {ride.passenger.rating} ({ride.passenger.totalRides} rides)
                        </span>
                      </div>
                    </div>
                    <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {ride.passenger.email}
                      </div>
                      {ride.passenger.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {ride.passenger.phone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

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

            {acceptedRides.length === 0 && (
              <p className="text-center text-muted-foreground">
                You haven't accepted any rides yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}