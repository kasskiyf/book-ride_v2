import { RideRequest } from "@/lib/types/ride";
import { User } from "@/lib/types/auth";

class RideService {
  private readonly storageKey = "jacks_ride_requests";

  getRideRequests(): RideRequest[] {
    if (typeof window === "undefined") return [];
    
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return [];

      const requests = JSON.parse(data);
      // Convert date strings back to Date objects
      return requests.map((request: any) => ({
        ...request,
        date: new Date(request.date),
      }));
    } catch (error) {
      console.error("Error getting ride requests:", error);
      return [];
    }
  }

  getRideRequestsByUser(userId: string): RideRequest[] {
    return this.getRideRequests().filter((request) => request.passenger.id === userId);
  }

  getRideRequestsByDriver(driverId: string): RideRequest[] {
    return this.getRideRequests().filter((request) => request.driverId === driverId);
  }

  getAvailableRideRequests(): RideRequest[] {
    return this.getRideRequests().filter((request) => request.status === "pending");
  }

  createRideRequest(data: any, user: User): RideRequest {
    const requests = this.getRideRequests();
    
    const newRequest: RideRequest = {
      id: crypto.randomUUID(),
      userId: user.id,
      pickupLocation: data.pickupLocation,
      dropoffLocation: data.dropoffLocation,
      date: data.date,
      time: data.time,
      status: "pending",
      createdAt: new Date().toISOString(),
      passenger: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        rating: 4.5, // Mock rating
        totalRides: 15, // Mock total rides
      },
      specialRequests: data.specialRequests,
    };

    this.setRideRequests([...requests, newRequest]);
    return newRequest;
  }

  acceptRideRequest(requestId: string, driver: User): RideRequest {
    const requests = this.getRideRequests();
    const request = requests.find((r) => r.id === requestId);

    if (!request) {
      throw new Error("Ride request not found");
    }

    if (request.status !== "pending") {
      throw new Error("Ride request is no longer available");
    }

    const updatedRequest = {
      ...request,
      status: "accepted",
      driverId: driver.id,
      estimatedArrival: this.calculateEstimatedArrival(),
      driver: {
        id: driver.id,
        firstName: driver.firstName,
        lastName: driver.lastName,
        email: driver.email,
        phone: driver.phone || "",
        rating: 4.9, // Mock rating
        totalRides: 120, // Mock total rides
        vehicle: {
          model: "Tesla Model S",
          color: "Black",
          plate: "ABC 123",
          year: "2023",
        },
      },
    };

    this.setRideRequests(
      requests.map((r) => (r.id === requestId ? updatedRequest : r))
    );

    return updatedRequest;
  }

  confirmRideRequest(requestId: string): RideRequest {
    const requests = this.getRideRequests();
    const request = requests.find((r) => r.id === requestId);

    if (!request) {
      throw new Error("Ride request not found");
    }

    if (request.status !== "accepted") {
      throw new Error("Ride request cannot be confirmed");
    }

    const updatedRequest = {
      ...request,
      status: "confirmed",
    };

    this.setRideRequests(
      requests.map((r) => (r.id === requestId ? updatedRequest : r))
    );

    return updatedRequest;
  }

  private setRideRequests(requests: RideRequest[]): void {
    if (typeof window === "undefined") return;
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(requests));
    } catch (error) {
      console.error("Error storing ride requests:", error);
    }
  }

  private calculateEstimatedArrival(): string {
    // Simulate arrival time calculation (5-15 minutes from now)
    const minutes = Math.floor(Math.random() * 11) + 5;
    const arrival = new Date();
    arrival.setMinutes(arrival.getMinutes() + minutes);
    return arrival.toISOString();
  }
}

export const rideService = new RideService();