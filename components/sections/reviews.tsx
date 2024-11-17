"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah Thompson",
    role: "Business Executive",
    content: "Exceptional service! The driver was professional and punctual. Will definitely use again.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Frequent Traveler",
    content: "Reliable and luxurious. Perfect for business travel and airport transfers.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1170&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Event Planner",
    content: "Outstanding service for our corporate events. The team is always professional.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop",
    rating: 5,
  },
];

export function Reviews() {
  return (
    <section className="bg-muted/50 py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Don't just take our word for it
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.name} className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={review.avatar} alt={review.name} />
                  <AvatarFallback>{review.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <h3 className="mt-2 font-semibold">{review.name}</h3>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">{review.content}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}