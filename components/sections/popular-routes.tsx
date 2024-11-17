"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const routes = [
  {
    title: "Airport Transfer",
    description: "Reliable transportation to and from major airports",
    image: "https://images.unsplash.com/photo-1577435812261-d68a7142d875?q=80&w=2574&auto=format&fit=crop",
    price: "From $59",
    badge: "Popular",
  },
  {
    title: "City Tour",
    description: "Explore the city with our experienced drivers",
    image: "https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?q=80&w=2509&auto=format&fit=crop",
    price: "From $79",
    badge: "Featured",
  },
  {
    title: "Business Travel",
    description: "Professional service for corporate clients",
    image: "https://images.unsplash.com/photo-1625234710735-11a1f8ee4cf1?q=80&w=2574&auto=format&fit=crop",
    price: "From $89",
    badge: "Business",
  },
  {
    title: "Wedding Service",
    description: "Luxury transportation for your special day",
    image: "https://images.unsplash.com/photo-1591628001888-76cc02e0c276?q=80&w=2574&auto=format&fit=crop",
    price: "From $199",
    badge: "Premium",
  },
  {
    title: "Wine Tour",
    description: "Visit the finest wineries in comfort",
    image: "https://images.unsplash.com/photo-1594787317554-dcc17c53f741?q=80&w=2574&auto=format&fit=crop",
    price: "From $149",
    badge: "Leisure",
  },
  {
    title: "Shopping Trip",
    description: "Convenient transport for shopping excursions",
    image: "https://images.unsplash.com/photo-1592805144716-feeccccef5ac?q=80&w=2574&auto=format&fit=crop",
    price: "From $69",
    badge: "Popular",
  },
  {
    title: "Night Out",
    description: "Safe and stylish evening transportation",
    image: "https://images.unsplash.com/photo-1492666673288-3c4b4576ad9a?q=80&w=2572&auto=format&fit=crop",
    price: "From $99",
    badge: "Premium",
  },
  {
    title: "Sports Event",
    description: "Get to the game in comfort and style",
    image: "https://images.unsplash.com/photo-1577427027997-94772c1a7ba2?q=80&w=2574&auto=format&fit=crop",
    price: "From $79",
    badge: "Events",
  },
  {
    title: "Concert Transfer",
    description: "Hassle-free transport to music venues",
    image: "https://images.unsplash.com/photo-1563292769-4e05b684851e?q=80&w=2574&auto=format&fit=crop",
    price: "From $89",
    badge: "Events",
  },
  {
    title: "Cruise Port",
    description: "Seamless transfer to cruise terminals",
    image: "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=2574&auto=format&fit=crop",
    price: "From $69",
    badge: "Featured",
  },
  {
    title: "Group Travel",
    description: "Comfortable transportation for large groups",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2574&auto=format&fit=crop",
    price: "From $129",
    badge: "Groups",
  },
  {
    title: "VIP Service",
    description: "Exclusive transportation for VIP clients",
    image: "https://images.unsplash.com/photo-1631486061580-33fdb5e30810?q=80&w=2070&auto=format&fit=crop",
    price: "From $299",
    badge: "Luxury",
  },
];

export function PopularRoutes() {
  return (
    <section className="container py-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Popular Routes
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover our most requested transportation services
        </p>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {routes.map((route) => (
          <Card key={route.title} className="group overflow-hidden">
            <div className="aspect-[16/9] relative">
              <Image
                src={route.image}
                alt={route.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute right-2 top-2">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur">
                  {route.badge}
                </Badge>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold">{route.title}</h3>
              <p className="mt-2 text-muted-foreground">{route.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-medium">{route.price}</span>
                <Button>Book Now</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}