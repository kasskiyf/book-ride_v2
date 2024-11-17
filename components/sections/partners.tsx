import Image from "next/image";
import { Card } from "@/components/ui/card";

const partners = [
  {
    name: "Luxury Hotels Group",
    logo: "https://images.unsplash.com/photo-1571867424488-4565932edb41?q=80&w=1374&auto=format&fit=crop",
  },
  {
    name: "Corporate Travel Solutions",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop",
  },
  {
    name: "Event Management Pro",
    logo: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1412&auto=format&fit=crop",
  },
  {
    name: "Global Business Connect",
    logo: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1374&auto=format&fit=crop",
  },
];

export function Partners() {
  return (
    <section className="container py-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Trusted by Industry Leaders
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          We partner with the best to deliver excellence
        </p>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {partners.map((partner) => (
          <Card
            key={partner.name}
            className="overflow-hidden p-8 transition-colors hover:bg-muted/50"
          >
            <div className="aspect-[2/1] relative">
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-cover"
              />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}