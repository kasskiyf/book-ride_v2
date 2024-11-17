import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Users, Clock, Globe } from "lucide-react";

const stats = [
  {
    label: "Years of Experience",
    value: "10+",
    icon: Clock,
  },
  {
    label: "Satisfied Clients",
    value: "50K+",
    icon: Users,
  },
  {
    label: "Cities Served",
    value: "100+",
    icon: Globe,
  },
  {
    label: "Industry Awards",
    value: "25+",
    icon: Trophy,
  },
];

export default function AboutPage() {
  return (
    <div className="container py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            About Jack's Ride
          </h1>
          <p className="text-lg text-muted-foreground">
            Since our founding, we've been committed to providing exceptional
            transportation services that combine luxury, reliability, and
            innovation.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <Card key={stat.label} className="p-6">
                <stat.icon className="mb-3 h-6 w-6 text-primary" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
          <Button size="lg" asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
        <div className="relative aspect-square lg:aspect-auto">
          <Image
            src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop"
            alt="About Jack's Ride"
            fill
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}