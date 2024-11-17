"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    description: "123 Business Avenue, Suite 100, New York, NY 10001",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "+1 (555) 123-4567",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "contact@jacksride.com",
  },
  {
    icon: Clock,
    title: "Working Hours",
    description: "24/7, 365 days a year",
  },
];

export default function ContactPage() {
  return (
    <div className="container py-24">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Get in touch with our team for any inquiries or support
        </p>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <Card className="p-8">
          <h2 className="text-2xl font-semibold">Send Us a Message</h2>
          <p className="mt-2 text-muted-foreground">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
          <form className="mt-8 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Input placeholder="First Name" />
              </div>
              <div>
                <Input placeholder="Last Name" />
              </div>
            </div>
            <div>
              <Input type="email" placeholder="Email Address" />
            </div>
            <div>
              <Input placeholder="Subject" />
            </div>
            <div>
              <Textarea
                placeholder="Your Message"
                className="min-h-[150px] resize-none"
              />
            </div>
            <Button size="lg" className="w-full">
              Send Message
            </Button>
          </form>
        </Card>

        <div className="grid gap-8 sm:grid-cols-2">
          {contactInfo.map((item) => (
            <Card key={item.title} className="p-6">
              <item.icon className="mb-4 h-6 w-6 text-primary" />
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}