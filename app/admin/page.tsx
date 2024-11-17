"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Car,
  DollarSign,
  Star,
  TrendingUp,
  Clock,
  MapPin,
  Shield,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const stats = [
  {
    name: "Total Users",
    value: "2,543",
    change: "+12.5%",
    trend: "up",
    icon: Users,
  },
  {
    name: "Active Drivers",
    value: "186",
    change: "+8.2%",
    trend: "up",
    icon: Car,
  },
  {
    name: "Revenue",
    value: "$45,678",
    change: "+23.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    name: "Avg. Rating",
    value: "4.8",
    change: "+0.2",
    trend: "up",
    icon: Star,
  },
];

const revenueData = [
  { name: "Jan", value: 12000 },
  { name: "Feb", value: 19000 },
  { name: "Mar", value: 17000 },
  { name: "Apr", value: 21000 },
  { name: "May", value: 25000 },
  { name: "Jun", value: 32000 },
];

const rideTypes = [
  { name: "Airport", value: 35 },
  { name: "Business", value: 25 },
  { name: "Personal", value: 20 },
  { name: "Events", value: 20 },
];

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

// Custom axis components to replace defaultProps
const CustomXAxis = (props: any) => (
  <XAxis
    axisLine={false}
    tickLine={false}
    tick={{ fill: 'hsl(var(--muted-foreground))' }}
    {...props}
  />
);

const CustomYAxis = (props: any) => (
  <YAxis
    axisLine={false}
    tickLine={false}
    tick={{ fill: 'hsl(var(--muted-foreground))' }}
    {...props}
  />
);

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, Admin
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
                <p className="mt-1 text-2xl font-semibold">{stat.value}</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-500">{stat.change}</span>
              <span className="text-sm text-muted-foreground">vs last month</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="font-semibold">Revenue Overview</h2>
            <p className="text-sm text-muted-foreground">
              Monthly revenue trends
            </p>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <CustomXAxis dataKey="name" />
                <CustomYAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-6">
            <h2 className="font-semibold">Ride Distribution</h2>
            <p className="text-sm text-muted-foreground">
              Breakdown by ride type
            </p>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={rideTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {rideTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {rideTypes.map((type, index) => (
              <div key={type.name} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-sm">
                  {type.name} ({type.value}%)
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6">
          <h2 className="font-semibold">Recent Activity</h2>
          <div className="mt-4 space-y-4">
            {[
              { icon: Car, text: "New driver registration" },
              { icon: MapPin, text: "Ride completed successfully" },
              { icon: Clock, text: "Peak hours starting soon" },
              { icon: Shield, text: "Security check completed" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-2 p-6">
          <h2 className="font-semibold">System Status</h2>
          <div className="mt-4 space-y-4">
            {[
              { name: "Server Uptime", value: "99.9%", status: "Operational" },
              { name: "API Response Time", value: "245ms", status: "Good" },
              { name: "Database Load", value: "42%", status: "Normal" },
              { name: "Active Sessions", value: "1,234", status: "High" },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-lg bg-muted p-3"
              >
                <span className="text-sm font-medium">{item.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm">{item.value}</span>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}