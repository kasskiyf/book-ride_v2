"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, AppleIcon, SmartphoneNfc } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { rideService } from "@/lib/rides";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

export function HeroSection() {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in to book a ride");
      router.push("/auth");
      return;
    }

    if (!date || !time || !pickupLocation || !dropoffLocation) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const request = rideService.createRideRequest({
        pickupLocation,
        dropoffLocation,
        date,
        time,
        specialRequests,
      }, user);

      toast.success("Ride request submitted successfully");
      router.push(`/rides/${request.id}`);
    } catch (error) {
      toast.error("Failed to submit ride request");
    }
  };

  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/25" />
      </div>

      <div className="container relative grid min-h-[calc(100vh-4rem)] items-center gap-8 pb-20 pt-32 md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Your Premium
            <br />
            Transportation Service
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Experience luxury and comfort with our professional chauffeur service.
            Available 24/7 for all your transportation needs.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button 
              size="lg" 
              className="group relative h-16 overflow-hidden rounded-xl bg-black px-8 transition-all hover:bg-black/90"
            >
              <div className="relative flex items-center justify-center gap-2">
                <AppleIcon className="h-6 w-6" />
                <div className="flex flex-col items-start">
                  <span className="text-xs">Download on the</span>
                  <span className="text-lg font-semibold leading-none">App Store</span>
                </div>
              </div>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="group relative h-16 overflow-hidden rounded-xl border-2 px-8 transition-all hover:bg-primary hover:text-primary-foreground"
            >
              <div className="relative flex items-center justify-center gap-2">
                <SmartphoneNfc className="h-6 w-6" />
                <div className="flex flex-col items-start">
                  <span className="text-xs">Get it on</span>
                  <span className="text-lg font-semibold leading-none">Play Store</span>
                </div>
              </div>
            </Button>
          </div>
        </div>

        <Card className="w-full p-6" id="booking">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Book a Ride</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Pickup Location"
                  className="h-11"
                  icon={<MapPin className="h-4 w-4" />}
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Drop-off Location"
                  className="h-11"
                  icon={<MapPin className="h-4 w-4" />}
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-11 w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Input 
                  type="time" 
                  className="h-11"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Special requests or notes for the driver (optional)"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
              </div>
              <Button type="submit" className="h-11 w-full">
                Search Available Rides
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}