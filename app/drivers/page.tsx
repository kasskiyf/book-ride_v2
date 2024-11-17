"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Shield, DollarSign, Clock, Star } from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    title: "Flexible Schedule",
    description: "Work when you want, as much as you want. You're in control of your time.",
    icon: Clock,
  },
  {
    title: "Competitive Earnings",
    description: "Earn competitive rates with bonuses for peak hours and special events.",
    icon: DollarSign,
  },
  {
    title: "Premium Clients",
    description: "Drive for high-end clients and build a loyal customer base.",
    icon: Star,
  },
  {
    title: "Safety First",
    description: "Comprehensive insurance coverage and 24/7 support for peace of mind.",
    icon: Shield,
  },
];

const requirements = [
  "Valid driver's license with at least 3 years of driving experience",
  "Clean driving record",
  "Professional appearance and excellent customer service skills",
  "Reliable vehicle not older than 5 years (or ability to lease one)",
  "Smartphone with data plan",
  "Must be at least 21 years old",
  "Must pass background check and drug screening",
];

export default function DriversPage() {
  return (
    <div className="container py-24">
      <div className="mx-auto max-w-4xl space-y-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Drive with Jack's Ride
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Join our network of professional chauffeurs and earn on your own terms
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/auth?register=true&type=driver">Apply Now</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="rounded-lg bg-muted p-8">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Car className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Requirements</h2>
              <p className="text-muted-foreground">
                What you need to become a driver
              </p>
            </div>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {requirements.map((requirement) => (
              <li key={requirement} className="flex items-start gap-2">
                <Badge variant="secondary" className="mt-1 shrink-0">
                  Required
                </Badge>
                <span className="text-sm">{requirement}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border p-8 text-center">
          <h2 className="text-2xl font-semibold">Ready to Get Started?</h2>
          <p className="mt-2 text-muted-foreground">
            Complete your application in less than 10 minutes
          </p>
          <div className="mt-6">
            <Button size="lg" asChild>
              <Link href="/auth?register=true&type=driver">Apply Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}