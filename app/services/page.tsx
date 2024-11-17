import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plane, Car, Users, Crown, Leaf, Shield } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Airport Transfers",
    description: "Reliable and comfortable transportation to and from airports",
    icon: Plane,
    href: "/services/airport-transfers",
  },
  {
    title: "Long Distance",
    description: "Comfortable rides for longer journeys between cities",
    icon: Car,
    href: "/services/long-distance",
  },
  {
    title: "Business Solutions",
    description: "Corporate transportation services for professionals",
    icon: Users,
    href: "/services/business",
  },
  {
    title: "VIP Services",
    description: "Luxury transportation for special occasions",
    icon: Crown,
    href: "/services/vip",
  },
  {
    title: "Eco-Friendly",
    description: "Sustainable transportation options",
    icon: Leaf,
    href: "/services/eco",
  },
  {
    title: "Safety First",
    description: "Enhanced safety measures for your peace of mind",
    icon: Shield,
    href: "/services/safety",
  },
];

export default function ServicesPage() {
  return (
    <div className="container py-24">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Our Services
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Comprehensive transportation solutions for every need
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className="flex flex-col p-8">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <service.icon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">{service.title}</h2>
            <p className="mb-4 flex-1 text-muted-foreground">
              {service.description}
            </p>
            <Button asChild>
              <Link href={service.href}>Learn More</Link>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}