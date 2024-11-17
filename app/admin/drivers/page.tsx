"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Star } from "lucide-react";

const drivers = [
  {
    id: "1",
    name: "David Wilson",
    email: "david@driver.com",
    status: "active",
    rating: 4.9,
    rides: 256,
    earnings: "$3,450",
    vehicle: "Tesla Model S",
  },
  {
    id: "2",
    name: "Sarah Brown",
    email: "sarah@driver.com",
    status: "active",
    rating: 4.8,
    rides: 189,
    earnings: "$2,890",
    vehicle: "BMW 5 Series",
  },
  {
    id: "3",
    name: "Michael Lee",
    email: "michael@driver.com",
    status: "pending",
    rating: 0,
    rides: 0,
    earnings: "$0",
    vehicle: "Mercedes E-Class",
  },
];

export default function DriversPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Drivers</h1>
        <p className="text-muted-foreground">Manage driver accounts and performance</p>
      </div>

      <Card>
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search drivers..."
                className="pl-9"
              />
            </div>
            <Button variant="outline">Filters</Button>
          </div>

          <div className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Rides</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {driver.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{driver.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {driver.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          driver.status === "active"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-yellow-500/10 text-yellow-500"
                        }
                      >
                        {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span>{driver.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>{driver.rides}</TableCell>
                    <TableCell>{driver.earnings}</TableCell>
                    <TableCell>{driver.vehicle}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
}