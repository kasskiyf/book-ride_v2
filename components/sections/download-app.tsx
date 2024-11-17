"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AppleIcon, SmartphoneNfc } from "lucide-react";
import Image from "next/image";

export function DownloadApp() {
  return (
    <section className="container py-24">
      <Card className="relative overflow-hidden">
        <div className="grid gap-8 p-8 md:grid-cols-2 md:p-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">
              Download Our Mobile App
            </h2>
            <p className="text-lg text-muted-foreground">
              Get real-time updates, track your ride, and book services on the go
              with our mobile app.
            </p>
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Button className="h-12" size="lg">
                <AppleIcon className="mr-2 h-5 w-5" />
                App Store
              </Button>
              <Button className="h-12" size="lg" variant="outline">
                <SmartphoneNfc className="mr-2 h-5 w-5" />
                Play Store
              </Button>
            </div>
          </div>
          <div className="relative hidden aspect-square md:block">
            <Image
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1470&auto=format&fit=crop"
              alt="Mobile app preview"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Card>
    </section>
  );
}