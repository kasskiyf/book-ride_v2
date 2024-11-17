import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Building2,
  CalendarClock,
  Users2,
  BarChart3,
  HeartHandshake,
  Shield,
} from "lucide-react";
import Link from "next/link";

const solutions = [
  {
    title: "Corporate Solutions",
    description: "Tailored transportation services for businesses",
    icon: Building2,
    href: "/business/corporate",
  },
  {
    title: "Event Management",
    description: "Coordinated transport for corporate events",
    icon: CalendarClock,
    href: "/business/events",
  },
  {
    title: "Employee Transportation",
    description: "Regular shuttle services for your workforce",
    icon: Users2,
    href: "/business/employee-transport",
  },
  {
    title: "Analytics & Reporting",
    description: "Detailed insights into your transportation spend",
    icon: BarChart3,
    href: "/business/analytics",
  },
  {
    title: "Partner Program",
    description: "Join our network of business partners",
    icon: HeartHandshake,
    href: "/business/partner-program",
  },
  {
    title: "Duty of Care",
    description: "Enhanced safety and security measures",
    icon: Shield,
    href: "/business/duty-of-care",
  },
];

export default function BusinessPage() {
  return (
    <div className="container py-24">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Business Solutions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Enterprise-grade transportation management for your organization
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {solutions.map((solution) => (
          <Card key={solution.title} className="flex flex-col p-8">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <solution.icon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">{solution.title}</h2>
            <p className="mb-4 flex-1 text-muted-foreground">
              {solution.description}
            </p>
            <Button asChild>
              <Link href={solution.href}>Learn More</Link>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}