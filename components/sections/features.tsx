"use client";

import { Card } from "@/components/ui/card";
import { Clock, Shield, Star, Headphones } from "lucide-react";

const features = [
  {
    name: "24/7 Availability",
    description: "Round-the-clock service to meet your transportation needs anytime.",
    icon: Clock,
  },
  {
    name: "Premium Service",
    description: "Luxury vehicles and professional chauffeurs for a superior experience.",
    icon: Star,
  },
  {
    name: "Safety First",
    description: "Fully licensed, insured, and regularly maintained vehicles.",
    icon: Shield,
  },
  {
    name: "Customer Support",
    description: "Dedicated support team available to assist you at any time.",
    icon: Headphones,
  },
];

export function FeaturesSection() {
  return (
    <section className="container py-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Why Choose Jack's Ride?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Experience the difference with our premium transportation service
        </p>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.name} className="p-8">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 font-semibold">{feature.name}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}