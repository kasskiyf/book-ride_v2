import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  type: z.enum(["personal", "business", "driver", "admin"]),
  createdAt: z.string(),
  isProfileComplete: z.boolean().default(false),
});

export type User = z.infer<typeof userSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  type: z.enum(["personal", "business", "driver", "admin"]),
  companyName: z.string().optional(),
  driversLicense: z.string().optional(),
  vehicleRegistration: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});