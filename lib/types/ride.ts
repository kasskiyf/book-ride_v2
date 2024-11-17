import { z } from "zod";

export const rideRequestSchema = z.object({
  id: z.string(),
  userId: z.string(),
  pickupLocation: z.string().min(1, "Pickup location is required"),
  dropoffLocation: z.string().min(1, "Drop-off location is required"),
  date: z.date(),
  time: z.string(),
  status: z.enum(["pending", "accepted", "confirmed", "completed", "cancelled"]),
  driverId: z.string().optional(),
  createdAt: z.string(),
  estimatedArrival: z.string().optional(),
  price: z.number().optional(),
  passenger: z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phone: z.string().optional(),
    rating: z.number().optional(),
    totalRides: z.number().optional(),
  }),
  specialRequests: z.string().optional(),
  notes: z.string().optional(),
});

export type RideRequest = z.infer<typeof rideRequestSchema>;