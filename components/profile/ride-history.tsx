"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// Mock data - in a real app, this would come from an API
const rides = [
  {
    id: "1",
    date: new Date("2024-03-20T10:00:00"),
    from: "123 Main St",
    to: "456 Park Ave",
    status: "completed",
    price: "$25.00",
  },
  {
    id: "2",
    date: new Date("2024-03-18T14:30:00"),
    from: "Airport Terminal 1",
    to: "Downtown Hotel",
    status: "completed",
    price: "$45.00",
  },
  {
    id: "3",
    date: new Date("2024-03-15T09:00:00"),
    from: "Conference Center",
    to: "Business District",
    status: "cancelled",
    price: "$30.00",
  },
];

export function RideHistory() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Recent Rides</h2>
        <p className="text-sm text-muted-foreground">
          View your ride history and details
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rides.map((ride) => (
            <TableRow key={ride.id}>
              <TableCell>{format(ride.date, "PPp")}</TableCell>
              <TableCell>{ride.from}</TableCell>
              <TableCell>{ride.to}</TableCell>
              <TableCell>
                <Badge
                  variant={ride.status === "completed" ? "default" : "destructive"}
                >
                  {ride.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{ride.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}