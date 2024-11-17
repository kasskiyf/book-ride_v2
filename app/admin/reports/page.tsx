"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download } from "lucide-react";

const reports = [
  {
    id: "1",
    name: "Monthly Revenue Report",
    description: "Revenue breakdown by service type and region",
    lastGenerated: "2024-03-15",
    format: "PDF",
  },
  {
    id: "2",
    name: "Driver Performance Analysis",
    description: "Detailed metrics on driver ratings and efficiency",
    lastGenerated: "2024-03-14",
    format: "Excel",
  },
  {
    id: "3",
    name: "Customer Satisfaction Survey",
    description: "Analysis of customer feedback and ratings",
    lastGenerated: "2024-03-13",
    format: "PDF",
  },
  {
    id: "4",
    name: "Peak Hours Analysis",
    description: "Ride demand patterns and peak hour statistics",
    lastGenerated: "2024-03-12",
    format: "Excel",
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">
          Generate and download business reports
        </p>
      </div>

      <Card>
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Last Generated</TableHead>
                <TableHead>Format</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.description}</TableCell>
                  <TableCell>{report.lastGenerated}</TableCell>
                  <TableCell>{report.format}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}